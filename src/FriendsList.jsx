import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";

const StyledFriendsList = styled.div``;

const FriendsList = ({
  isAuthentified,
  friendsID,
  users,
  sendRequestFriend,
  friendsRequest,
}) => {
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
        friendsID.map((id) => (
          <div key={id}>{users.filter((user) => user.id === id)[0].name}</div>
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
              <Button onClick={() => sendRequestFriend(user.id)}>
                Request
              </Button>
            </div>
          ))
        ) : (
          <div>No users found</div>
        ))}
      {categoryToShow === "requests" && (
        <div>
          <div>Requests</div>
          {friendsRequest.map((id) => (
            <div key={id}>{users.filter((user) => user.id === id)[0].name}</div>
          ))}
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
};

export default FriendsList;
