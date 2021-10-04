import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFound } from "../store/Selectors";

const StyledAddFriendTab = styled.div``;

const AddFriendTab = ({ userLoggedId }) => {
  const dispatch = useDispatch();

  const [showUsersFound, setShowUsersFound] = useState(false);

  const [textTyped, setTextTyped] = useState("");

  const [textSubmitted, setTextSubmitted] = useState("");

  const usersFound = useSelector(getUsersFound(textSubmitted, userLoggedId));

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
      payload: { receiverId: friendIdToSendRequest, senderId: userLoggedId },
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

AddFriendTab.propTypes = {
  userLoggedId: PropTypes.number,
};

export default AddFriendTab;
