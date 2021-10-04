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

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }
  return (
    <StyledFriendsPage>
      <Button
        color="primary"
        variant={categoryToShow === "all" ? "contained" : "outlined"}
        onClick={() => setCategoryToShow("all")}
      >
        All
      </Button>
      <Button
        color="primary"
        variant={categoryToShow === "requests" ? "contained" : "outlined"}
        onClick={() => setCategoryToShow("requests")}
      >
        Requests
      </Button>
      <Button
        color="primary"
        variant={categoryToShow === "add" ? "contained" : "outlined"}
        onClick={() => setCategoryToShow("add")}
      >
        Add Friend
      </Button>

      {categoryToShow === "all" && (
        <AllFriendsTab userLoggedId={userLoggedId} />
      )}

      {categoryToShow === "requests" && (
        <FriendsRequestsTab userLoggedId={userLoggedId} />
      )}

      {categoryToShow === "add" && <AddFriendTab userLoggedId={userLoggedId} />}
    </StyledFriendsPage>
  );
};

FriendsPage.propTypes = {
  isAuthentified: PropTypes.bool,
  userLoggedId: PropTypes.number,
};

export default FriendsPage;
