import styled from "styled-components";

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
  }
`;

const ChatRoomNav = ({ chatRooms, changeChatRoom }) => {
  return (
    <StyledChatRoomNav>
      {chatRooms.map((chatroom) => (
        <div key={chatroom.id} onClick={() => changeChatRoom(chatroom.id)}>
          {chatroom.name}
        </div>
      ))}
    </StyledChatRoomNav>
  );
};

export default ChatRoomNav;
