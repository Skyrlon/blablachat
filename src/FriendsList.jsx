import styled from "styled-components";
import { Redirect } from "react-router";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

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

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }
  return (
    <StyledFriendsList>
      {friendsID.map((id) => (
        <div key={id}>{users.filter((user) => user.id === id)[0].name}</div>
      ))}
      {friendsID.length === 0 && <div>You have no friends yet</div>}
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
      {showUsersFound &&
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
      <div>Requests</div>
      {friendsRequest.map((id) => (
        <div key={id}>{users.filter((user) => user.id === id)[0].name}</div>
      ))}
    </StyledFriendsList>
  );
};

export default FriendsList;
