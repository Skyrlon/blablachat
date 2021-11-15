import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";
import { useState } from "react";
import { getChatroomsNames } from "../store/Selectors.jsx";
import { useSelector } from "react-redux";

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
  userLoggedId,
  changeChatRoom,
  currentChatroomId,
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

  const chatroomsNames = useSelector(
    getChatroomsNames(chatrooms, userLoggedId)
  );

  return (
    <StyledChatRoomNav>
      <AddChatRoom
        userLoggedId={userLoggedId}
        createChatRoom={createChatRoom}
      />
      {chatrooms.map((chatroom) => (
        <div
          className={`${chatroom.id === currentChatroomId && "active"}`}
          key={chatroom.id}
          onClick={(e) => {
            if (e.buttons !== 2) changeChatRoom(chatroom.id);
          }}
          onContextMenu={(e) => handleContextMenu(e, chatroom.id)}
        >
          <div>
            {
              chatroomsNames.find(
                (chatroomName) => chatroomName.id === chatroom.id
              ).name
            }
          </div>
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
      ))}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatrooms: PropTypes.array,
  userLoggedId: PropTypes.number,
  changeChatRoom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  createChatRoom: PropTypes.func,
  leaveChatroom: PropTypes.func,
};

export default ChatRoomNav;
