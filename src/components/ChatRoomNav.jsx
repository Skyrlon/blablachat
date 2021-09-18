import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";
import { useState } from "react";

const StyledChatRoomNav = styled.div`
  grid-area: nav;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  & > div {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    border: 1px solid;
    &.active {
      background-color: lightblue;
    }
  }
  & .dropdown {
    position: absolute;
    background-color: blue;
    z-index: 100;
    border: 1px solid;
    left: 100%;
    top: 0;
  }
`;

const ChatRoomNav = ({
  chatrooms,
  currentUser,
  changeChatRoom,
  currentChatRoom,
  friends,
  users,
  createChatRoom,
  leaveChatroom,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatroomIdDropdown, setChatroomIdDropdown] = useState(null);

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setShowDropdown((v) => !v);
    setChatroomIdDropdown(id);
  };

  return (
    <StyledChatRoomNav>
      <AddChatRoom
        friends={friends}
        users={users}
        createChatRoom={createChatRoom}
      />
      {chatrooms.map(
        (chatroom) =>
          chatroom.membersID.includes(currentUser.id) && (
            <div
              className={`${chatroom.id === currentChatRoom && "active"}`}
              key={chatroom.id}
              onClick={(e) => {
                if (e.buttons !== 2) changeChatRoom(chatroom.id);
              }}
              onContextMenu={(e) => handleContextMenu(e, chatroom.id)}
            >
              <div>{chatroom.name}</div>
              {showDropdown && chatroomIdDropdown === chatroom.id && (
                <div className="dropdown">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      leaveChatroom(chatroom.id);
                      setShowDropdown(false);
                    }}
                  >
                    Leave this chatroom
                  </div>
                </div>
              )}
            </div>
          )
      )}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatRooms: PropTypes.array,
  changeChatRoom: PropTypes.func,
  currentChatRoom: PropTypes.number,
  friends: PropTypes.array,
  users: PropTypes.array,
  createChatRoom: PropTypes.func,
  leaveChatroom: PropTypes.func,
};

export default ChatRoomNav;
