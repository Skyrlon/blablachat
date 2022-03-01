import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserId,
  getCurrentUserFriendsRequest,
} from "../store/Selectors";

const StyledFriendsRequestsTab = styled.div``;

const FriendsRequestsTab = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const friendsRequest = useSelector(getCurrentUserFriendsRequest());

  const acceptFriendRequest = (id) => {
    dispatch({
      type: "ACCEPT_FRIEND_REQUEST",
      payload: { receiverId: currentUserId, senderId: id },
    });
  };

  const rejectFriendRequest = (id) => {
    dispatch({
      type: "REJECT_FRIEND_REQUEST",
      payload: { receiverId: currentUserId, senderId: id },
    });
  };

  return (
    <StyledFriendsRequestsTab>
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
    </StyledFriendsRequestsTab>
  );
};

export default FriendsRequestsTab;
