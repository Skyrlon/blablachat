import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";
import ChatRoomNavItems from "./ChatRoomNavItems";

const StyledChatRoomNav = styled.div`
  grid-area: nav;
  position: relative;
  margin: 0;
  padding: 0;
  border: 1px solid black;
`;

const ChatRoomNav = ({
  chatrooms,
  userLoggedId,
  changeCurrentChatroom,
  currentChatroomId,
  leaveCurrentChatroom,
}) => {
  return (
    <StyledChatRoomNav>
      <AddChatRoom
        userLoggedId={userLoggedId}
        chatrooms={chatrooms}
        changeCurrentChatroom={changeCurrentChatroom}
      />

      {chatrooms.map((chatroom) => (
        <ChatRoomNavItems
          key={chatroom.id}
          chatroomId={chatroom.id}
          chatroomOwnerId={chatroom.ownerID}
          userLoggedId={userLoggedId}
          changeCurrentChatroom={changeCurrentChatroom}
          currentChatroomId={currentChatroomId}
          leaveCurrentChatroom={leaveCurrentChatroom}
        />
      ))}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatrooms: PropTypes.array,
  userLoggedId: PropTypes.number,
  changeCurrentChatroom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  createChatRoom: PropTypes.func,
  leaveCurrentChatroom: PropTypes.func,
};

export default ChatRoomNav;
