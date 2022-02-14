import styled from "styled-components";
import PropTypes from "prop-types";
import  Button  from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserFriendsRequest } from "../store/Selectors";

const StyledFriendsRequestsTab = styled.div``;

const FriendsRequestsTab = ({ userLoggedId }) => {
  const dispatch = useDispatch();

  const friendsRequest = useSelector(
    getCurrentUserFriendsRequest(userLoggedId)
  );

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

FriendsRequestsTab.propTypes = {
  userLoggedId: PropTypes.number,
};

export default FriendsRequestsTab;
