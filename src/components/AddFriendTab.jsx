import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFound } from "../store/Selectors";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

const StyledAddFriendTab = styled.div`
  & form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const AddFriendTab = () => {
  const dispatch = useDispatch();

  const [showUsersFound, setShowUsersFound] = useState(false);

  const [textTyped, setTextTyped] = useState("");

  const [textSubmitted, setTextSubmitted] = useState("");

  const usersFound = useSelector(getUsersFound(textSubmitted));

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
      payload: { receiverId: friendIdToSendRequest },
    });
  };

  return (
    <StyledAddFriendTab>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          sx={{ width: "98%", marginTop: "1rem" }}
          onChange={(e) => setTextTyped(e.target.value)}
          onKeyPress={(e) => handleInputSubmit(e)}
          value={textTyped}
          InputProps={{
            endAdornment: (
              <Button variant="contained" onClick={onSubmit}>
                Search
              </Button>
            ),
          }}
        />
      </form>

      <List>
        {showUsersFound &&
          (usersFound.length > 0 ? (
            usersFound.map((user) => (
              <div key={user.id}>
                <Divider />
                <ListItem>
                  <ListItemText>{user.name}</ListItemText>
                  <Button onClick={() => sendFriendRequest(user.id)}>
                    Send request
                  </Button>
                </ListItem>
              </div>
            ))
          ) : (
            <ListItem>
              <ListItemText>No users found</ListItemText>
            </ListItem>
          ))}
      </List>
    </StyledAddFriendTab>
  );
};

export default AddFriendTab;
