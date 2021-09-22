import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch } from "react-redux";

const StyledUserPseudo = styled.div`
  position: relative;
  & .tooltip {
    position: absolute;
    border: 1px solid black;
    background-color: grey;
    z-index: 100;
  }
`;

const UserPseudo = ({ children, currentUser, friends, users }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const contextMenu = (e) => {
    e.preventDefault();
    setShowMenu((v) => !v);
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: currentUser.id },
    });
  };

  const removeFriend = (friendId) => {
    dispatch({
      type: "REMOVE_FRIEND",
      payload: { formerFriends: [currentUser.id, friendId] },
    });
  };

  const handleClickAwayMenu = () => {
    setShowMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayMenu}>
      <StyledUserPseudo>
        <div onContextMenu={contextMenu}>{children}</div>
        {showMenu && (
          <div className="tooltip">
            {!friends.includes(
              users.filter((user) => user.name === children)[0].id
            ) &&
              !(children === currentUser.name) && (
                <div
                  onClick={() => {
                    sendFriendRequest(
                      users.filter((user) => user.name === children)[0].id
                    );
                    setShowMenu(false);
                  }}
                >
                  Request to be friend
                </div>
              )}
            {friends.includes(
              users.filter((user) => user.name === children)[0].id
            ) && (
              <div
                onClick={() => {
                  removeFriend(
                    users.filter((user) => user.name === children)[0].id
                  );
                  setShowMenu(false);
                }}
              >
                Unfriend
              </div>
            )}
            {children === currentUser.name && (
              <div>Can't unfriend or be friend with yourself</div>
            )}
          </div>
        )}
      </StyledUserPseudo>
    </ClickAwayListener>
  );
};

UserPseudo.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object,
  friends: PropTypes.array,
  removeFriend: PropTypes.func,
};

export default UserPseudo;
