import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";

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

const ChatRoomNav = ({
  chatRooms,
  changeChatRoom,
  currentChatRoom,
  friends,
  users,
  createChatRoom,
}) => {
  return (
    <StyledChatRoomNav>
      <AddChatRoom
        friends={friends}
        users={users}
        createChatRoom={createChatRoom}
      />
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
  friends: PropTypes.array,
  users: PropTypes.array,
  createChatRoom: PropTypes.func,
};

export default ChatRoomNav;
