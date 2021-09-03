import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const StyledUserPseudo = styled.div`
  position: relative;
  & .tooltip {
    position: absolute;
    border: 1px solid black;
    background-color: grey;
    z-index: 100;
  }
`;

const UserPseudo = ({
  children,
  currentUser,
  friends,
  users,
  sendRequestFriend,
  removeFriend,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const contextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };

  const handleClickAwayMenu = () => {
    setShowMenu(false);
  };

  return (
    <StyledUserPseudo>
      <div onContextMenu={contextMenu}>{children}</div>
      {showMenu && (
        <ClickAwayListener onClickAway={handleClickAwayMenu}>
          <div className="tooltip">
            {!friends.includes(
              users.filter((user) => user.name === children)[0].id
            ) &&
              !(children === currentUser.name) && (
                <div
                  onClick={() => {
                    sendRequestFriend(
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
        </ClickAwayListener>
      )}
    </StyledUserPseudo>
  );
};

UserPseudo.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object,
  friends: PropTypes.array,
  sendRequestFriend: PropTypes.func,
  removeFriend: PropTypes.func,
};

export default UserPseudo;
