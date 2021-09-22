import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import UserPseudo from "../components/UserPseudo";

const StyledFriendsList = styled.div``;

const FriendsList = ({
  isAuthentified,
  friendsID,
  users,
  friendsRequest,
  currentUser,
  removeFriend,
}) => {
  const dispatch = useDispatch();
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
      payload: { receiverId: friendIdToSendRequest, senderId: currentUser.id },
    });
  };

  const acceptFriendRequest = (id) => {
    dispatch({
      type: "ACCEPT_FRIEND_REQUEST",
      payload: { receiverId: currentUser.id, senderId: id },
    });
  };

  const rejectFriendRequest = (id) => {
    dispatch({
      type: "REJECT_FRIEND_REQUEST",
      payload: { receiverId: currentUser.id, senderId: id },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUsersFound(
      users.filter(
        (user) =>
          user.name.includes(searchedFriend) && !friendsID.includes(user.id)
      )
    );
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
    <StyledFriendsList>
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

      {categoryToShow === "all" &&
        friendsID.length > 0 &&
        friendsID.map((id) => (
          <UserPseudo
            key={id}
            currentUser={currentUser}
            friends={friendsID}
            users={users}
            removeFriend={removeFriend}
          >
            {users.filter((user) => user.id === id)[0].name}
          </UserPseudo>
        ))}
      {categoryToShow === "all" && friendsID.length === 0 && (
        <div>You have no friends yet</div>
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
            friendsRequest.map((id) => (
              <div key={id}>
                <div className="pseudo">
                  {users.filter((user) => user.id === id)[0].name}
                </div>
                <Button onClick={() => acceptFriendRequest(id)}>Accept</Button>
                <Button onClick={() => rejectFriendRequest(id)}>Reject</Button>
              </div>
            ))}
          {friendsRequest.length === 0 && <div>No requests yet</div>}
        </div>
      )}
    </StyledFriendsList>
  );
};

FriendsList.propTypes = {
  isAuthentified: PropTypes.bool,
  friendsID: PropTypes.array,
  users: PropTypes.array,
  sendRequestFriend: PropTypes.func,
  friendsRequest: PropTypes.array,
  acceptFriendRequest: PropTypes.func,
  rejectFriendRequest: PropTypes.func,
  currentUser: PropTypes.object,
  removeFriend: PropTypes.func,
};

export default FriendsList;
