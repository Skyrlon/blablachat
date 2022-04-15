import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserFriendsRequest } from "../store/Selectors";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const StyledFriendsRequestsTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FriendsRequestsTab = () => {
  const dispatch = useDispatch();

  const friendsRequest = useSelector(getCurrentUserFriendsRequest());

  const acceptFriendRequest = (id) => {
    dispatch({
      type: "ACCEPT_FRIEND_REQUEST",
      payload: { senderId: id },
    });
  };

  const rejectFriendRequest = (id) => {
    dispatch({
      type: "REJECT_FRIEND_REQUEST",
      payload: { senderId: id },
    });
  };

  return (
    <StyledFriendsRequestsTab>
      <List
        sx={{ width: "98%" }}
        component="div"
        subheader={
          <ListSubheader component="div">
            Requests - {friendsRequest.length}
          </ListSubheader>
        }
      >
        {friendsRequest.length > 0 &&
          friendsRequest.map((sender) => (
            <div key={sender.id}>
              <Divider />
              <ListItemButton>
                <ListItemText>{sender.name}</ListItemText>
                <Button onClick={() => acceptFriendRequest(sender.id)}>
                  Accept
                </Button>
                <Button onClick={() => rejectFriendRequest(sender.id)}>
                  Reject
                </Button>
              </ListItemButton>
            </div>
          ))}
        {friendsRequest.length === 0 && <div>No requests yet</div>}
      </List>
    </StyledFriendsRequestsTab>
  );
};

export default FriendsRequestsTab;
