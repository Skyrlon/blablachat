import styled from "styled-components";
import PropTypes from "prop-types";

const StyledChatRoomNav = styled.div`
  grid-area: nav;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  & > div {
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    border: 1px solid;
    &.active {
      background-color: lightblue;
    }
  }
`;

const ChatRoomNav = ({ chatRooms, changeChatRoom, currentChatRoom }) => {
  return (
    <StyledChatRoomNav>
      {chatRooms.map((chatroom) => (
        <div
          className={`${chatroom.id === currentChatRoom && "active"}`}
          key={chatroom.id}
          onClick={() => changeChatRoom(chatroom.id)}
        >
          {chatroom.name}
        </div>
      ))}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatRooms: PropTypes.array,
  changeChatRoom: PropTypes.func,
  currentChatRoom: PropTypes.number,
};

export default ChatRoomNav;
