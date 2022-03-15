import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";

import { useState } from "react";

import AllFriendsTab from "../components/AllFriendsTab";
import FriendsRequestsTab from "../components/FriendsRequestsTab";
import AddFriendTab from "../components/AddFriendTab";
import { useSelector } from "react-redux";
import {
  getCurrentUserFriendsRequest,
  getIsAuthentified,
} from "../store/Selectors";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const StyledFriendsPage = styled.div`
  & .tab {
    min-height: 1rem;

    &-text {
      padding-right: 0.75rem;
    }
  }
`;

const FriendsPage = () => {
  let navigate = useNavigate();

  const isAuthentified = useSelector(getIsAuthentified());

  if (!isAuthentified) {
    navigate("/connexion");
  }

  const [categoryToShow, setCategoryToShow] = useState("all");

  const friendsRequest = useSelector(getCurrentUserFriendsRequest());

  const handleChange = (e, newValue) => {
    setCategoryToShow(newValue);
  };

  return (
    <StyledFriendsPage>
      <Box sx={{ height: "3.5rem" }}>
        <Tabs value={categoryToShow} onChange={handleChange}>
          <Tab className="tab" value="all" label="All" />

          <Tab
            className="tab"
            value="requests"
            label={
              <Badge badgeContent={friendsRequest.length} color="primary">
                <span className="tab-text">Requests</span>
              </Badge>
            }
          />

          <Tab className="tab" value="add-friend" label="Add Friend" />
        </Tabs>
      </Box>

      <Divider />

      {categoryToShow === "all" && <AllFriendsTab />}

      {categoryToShow === "requests" && <FriendsRequestsTab />}

      {categoryToShow === "add-friend" && <AddFriendTab />}
    </StyledFriendsPage>
  );
};

export default FriendsPage;
