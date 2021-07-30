import styled from "styled-components";

const StyledChatRoomNav = styled.ul`
  width: 10vw;
  & > li {
    width: 100%;
    padding: 1em;
    border: 1px solid;
    list-style: none;
  }
`;

const ChatRoomNav = ({ chatRooms, changeChatRoom }) => {
  return (
    <StyledChatRoomNav>
      {chatRooms.map((chatroom) => (
        <li key={chatroom.id} onClick={() => changeChatRoom(chatroom.id)}>
          {chatroom.name}
        </li>
      ))}
    </StyledChatRoomNav>
  );
};

export default ChatRoomNav;
