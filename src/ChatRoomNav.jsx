import styled from "styled-components";

const StyledChatRoomNav = styled.div`
  position: absolute;
  left: 0;
  width: 10vw;
  & > div {
    width: 100%;
  }
`;

const ChatRoomNav = ({ chatRooms, changeChatRoom }) => {
  return (
    <StyledChatRoomNav>
      {chatRooms.map((chatroom) => (
        <div onClick={() => changeChatRoom(chatroom.id)}>{chatroom.name}</div>
      ))}
    </StyledChatRoomNav>
  );
};

export default ChatRoomNav;
