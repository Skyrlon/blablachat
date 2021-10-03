import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserFriendsRequest } from "../store/Selectors";

import AllFriendsTab from "../components/AllFriendsTab";

const StyledFriendsPage = styled.div``;

const FriendsPage = ({ isAuthentified, userLoggedId }) => {
  const dispatch = useDispatch();

  const friendsRequest = useSelector(
    getCurrentUserFriendsRequest(userLoggedId)
  );

  const [searchedFriend, setSearchedFriend] = useState("");

  const [usersFound, setUsersFound] = useState([]);

  const [showUsersFound, setShowUsersFound] = useState(false);

  const [categoryToShow, setCategoryToShow] = useState("all");

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: userLoggedId },
    });
  };

  const acceptFriendRequest = (id) => {
    dispatch({
      type: "ACCEPT_FRIEND_REQUEST",
      payload: { receiverId: userLoggedId, senderId: id },
    });
  };

  const rejectFriendRequest = (id) => {
    dispatch({
      type: "REJECT_FRIEND_REQUEST",
      payload: { receiverId: userLoggedId, senderId: id },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    /* setUsersFound(
      users.filter(
        (user) =>
          user.name.includes(searchedFriend) && !friendsID.includes(user.id)
      )
    ); */
    setShowUsersFound(true);
  };

  useEffect(() => {
    setShowUsersFound(false);
    setSearchedFriend("");
    setUsersFound([]);
  }, [categoryToShow]);

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

      {categoryToShow === "add" && (
        <form onSubmit={onSubmit}>
          <TextField
            type="text"
            label="Add friend"
            onChange={(e) => setSearchedFriend(e.target.value)}
            onKeyPress={(e) => handleInputSubmit(e)}
            value={searchedFriend}
          />
          <Button onClick={onSubmit}>Search</Button>
        </form>
      )}

      {categoryToShow === "add" &&
        showUsersFound &&
        (usersFound.length > 0 ? (
          usersFound.map((user) => (
            <div key={user.id}>
              <div>{user.name}</div>
              <Button onClick={() => sendFriendRequest(user.id)}>
                Request
              </Button>
            </div>
          ))
        ) : (
          <div>No users found</div>
        ))}

      {categoryToShow === "requests" && (
        <div>
          {friendsRequest.length > 0 &&
            friendsRequest.map((sender) => (
              <div key={sender.id}>
                <div className="pseudo">{sender.name}</div>
                <Button onClick={() => acceptFriendRequest(sender.id)}>
                  Accept
                </Button>
                <Button onClick={() => rejectFriendRequest(sender.id)}>
                  Reject
                </Button>
              </div>
            ))}
          {friendsRequest.length === 0 && <div>No requests yet</div>}
        </div>
      )}
    </StyledFriendsPage>
  );
};

FriendsPage.propTypes = {
  isAuthentified: PropTypes.bool,
  userLoggedId: PropTypes.number,
};

export default FriendsPage;
