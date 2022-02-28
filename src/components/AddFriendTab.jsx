import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, getUsersFound } from "../store/Selectors";

const StyledAddFriendTab = styled.div``;

const AddFriendTab = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const [showUsersFound, setShowUsersFound] = useState(false);

  const [textTyped, setTextTyped] = useState("");

  const [textSubmitted, setTextSubmitted] = useState("");

  const usersFound = useSelector(getUsersFound(textSubmitted, currentUserId));

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTextSubmitted(textTyped);
    setShowUsersFound(true);
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: currentUserId },
    });
  };

  return (
    <StyledAddFriendTab>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          label="Add friend"
          onChange={(e) => setTextTyped(e.target.value)}
          onKeyPress={(e) => handleInputSubmit(e)}
          value={textTyped}
        />
        <Button onClick={onSubmit}>Search</Button>
      </form>

      {showUsersFound &&
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
    </StyledAddFriendTab>
  );
};

export default AddFriendTab;
