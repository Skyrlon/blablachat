import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Button } from "@material-ui/core";
import { useState } from "react";

import AllFriendsTab from "../components/AllFriendsTab";
import FriendsRequestsTab from "../components/FriendsRequestsTab";
import AddFriendTab from "../components/AddFriendTab";

const StyledFriendsPage = styled.div``;

const FriendsPage = ({ isAuthentified, userLoggedId }) => {
  const [categoryToShow, setCategoryToShow] = useState("all");

  const buttonsTab = [
    { category: "all", title: "All" },
    { category: "requests", title: "Requests" },
    { category: "add friend", title: "Add Friend" },
  ];

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }
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
        </Button>
      ))}

      {categoryToShow === "all" && (
        <AllFriendsTab userLoggedId={userLoggedId} />
      )}

      {categoryToShow === "requests" && (
        <FriendsRequestsTab userLoggedId={userLoggedId} />
      )}

      {categoryToShow === "add friend" && (
        <AddFriendTab userLoggedId={userLoggedId} />
      )}
    </StyledFriendsPage>
  );
};

FriendsPage.propTypes = {
  isAuthentified: PropTypes.bool,
  userLoggedId: PropTypes.number,
};

export default FriendsPage;
