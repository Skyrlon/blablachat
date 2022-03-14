import styled from "styled-components";
import Button from "@mui/material/Button";
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

const StyledFriendsPage = styled.div`
  & .requests-number {
    margin-left: 0.1rem;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #3f51b5;
    color: white;
    &.active {
      color: #3f51b5;
      background-color: white;
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

  const buttonsTab = [
    { category: "all", title: "All" },
    { category: "requests", title: "Requests" },
    { category: "add friend", title: "Add Friend" },
  ];

  return (
    <StyledFriendsPage>
      {buttonsTab.map((tab) => (
        <Button
          key={tab.category}
          color="primary"
          variant={categoryToShow === tab.category ? "contained" : "outlined"}
          onClick={() => setCategoryToShow(tab.category)}
        >
          {tab.title}
          {tab.category === "requests" && friendsRequest.length > 0 && (
            <span
              className={`requests-number${
                categoryToShow === tab.category ? " active" : ""
              }`}
            >
              {friendsRequest.length}
            </span>
          )}
        </Button>
      ))}

      {categoryToShow === "all" && <AllFriendsTab />}

      {categoryToShow === "requests" && <FriendsRequestsTab />}

      {categoryToShow === "add friend" && <AddFriendTab />}
    </StyledFriendsPage>
  );
};

export default FriendsPage;
