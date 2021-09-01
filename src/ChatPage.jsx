import PropTypes from "prop-types";
import Chat from "./Chat.jsx";
import ChatRoomNav from "./ChatRoomNav.jsx";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";
import SendMessage from "./SendMessage.jsx";
import MembersSidebar from "./MembersSidebar.jsx";

const StyledChatPage = styled.div`
  width: 98.5vw;
  height: 87vh;
  display: grid;
  grid-template:
    "nav chat members" auto
    "nav chat members" auto
    "nav send members" 5% / 10vw auto 7vw;
`;

const ChatPage = ({
  currentChatRoom,
  modifyMessages,
  isAuthentified,
  currentUser,
  users,
  chatRooms,
  changeChatRoom,
  createChatRoom,
}) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }

  return (
    <StyledChatPage>
      <ChatRoomNav
        friends={currentUser.friendsID}
        users={users}
        chatRooms={chatRooms}
        changeChatRoom={changeChatRoom}
        currentChatRoom={currentChatRoom}
        createChatRoom={createChatRoom}
      />
      {chatRooms.length > 0 && (
        <Chat
          messages={
            chatRooms.filter((chatroom) => chatroom.id === currentChatRoom)[0]
              .messages
          }
          users={users}
          modifyMessages={modifyMessages}
          currentUser={currentUser}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
        />
      )}
      {chatRooms.length > 0 && (
        <SendMessage
          messages={
            chatRooms.filter((chatroom) => chatroom.id === currentChatRoom)[0]
              .messages
          }
          currentUser={currentUser}
          modifyMessages={modifyMessages}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
        />
      )}
      <MembersSidebar
        users={users}
        members={
          chatRooms.filter((chatroom) => chatroom.id === currentChatRoom)[0]
            .membersID
        }
      />
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  currentChatRoom: PropTypes.number,
  modifyMessages: PropTypes.func,
  isAuthentified: PropTypes.bool,
  currentUser: PropTypes.object,
  users: PropTypes.array,
  chatRooms: PropTypes.array,
  changeChatRoom: PropTypes.func,
  createChatRoom: PropTypes.func,
};

export default ChatPage;
