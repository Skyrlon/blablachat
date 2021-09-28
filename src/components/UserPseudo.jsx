import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCurrentUserFriends, getUserName } from "../store/Selectors";

const StyledUserPseudo = styled.div`
  position: relative;
  & .tooltip {
    position: absolute;
    border: 1px solid black;
    background-color: grey;
    z-index: 100;
  }
`;

const UserPseudo = ({ userId, userLoggedId }) => {
  const dispatch = useDispatch();

  const userName = useSelector(getUserName(userId));

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

  const [showMenu, setShowMenu] = useState(false);

  const contextMenu = (e) => {
    e.preventDefault();
    setShowMenu((v) => !v);
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: userLoggedId },
    });
  };

  const removeFriend = (friendId) => {
    dispatch({
      type: "REMOVE_FRIEND",
      payload: { formerFriends: [userLoggedId, friendId] },
    });
  };

  const handleClickAwayMenu = () => {
    setShowMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayMenu}>
      <StyledUserPseudo>
        <div onContextMenu={contextMenu}>{userName}</div>
        {showMenu && (
          <div className="tooltip">
            {!friends.map((friend) => friend.id).includes(userId) &&
              !(userId === userLoggedId) && (
                <div
                  onClick={() => {
                    sendFriendRequest(userId);
                    setShowMenu(false);
                  }}
                >
                  Request to be friend
                </div>
              )}
            {friends.map((friend) => friend.id).includes(userId) && (
              <div
                onClick={() => {
                  removeFriend(userId);
                  setShowMenu(false);
                }}
              >
                Unfriend
              </div>
            )}
            {userId === userLoggedId && (
              <div>Can't unfriend or be friend with yourself</div>
            )}
          </div>
        )}
      </StyledUserPseudo>
    </ClickAwayListener>
  );
};

UserPseudo.propTypes = {
  userLoggedId: PropTypes.number,
  writerID: PropTypes.number,
};

export default UserPseudo;
