import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";

import Chat from "../components/Chat.jsx";
import ChatRoomNav from "../components/ChatRoomNav.jsx";
import SendMessage from "../components/SendMessage.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import AddMember from "../components/AddMember.jsx";

const StyledChatPage = styled.div`
  position: relative;
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
  sendRequestFriend,
  removeFriend,
  addMember,
  leaveChatroom,
}) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }

  return (
    <StyledChatPage>
      {chatRooms.length > 0 && (
        <AddMember
          addMember={(ids) => addMember(currentChatRoom, ids)}
          friends={currentUser.friendsID}
          members={
            chatRooms.filter((chatroom) => chatroom.id === currentChatRoom)[0]
              .membersID
          }
          users={users}
        />
      )}
      <ChatRoomNav
        friends={currentUser.friendsID}
        users={users}
        chatRooms={chatRooms}
        changeChatRoom={changeChatRoom}
        currentChatRoom={currentChatRoom}
        createChatRoom={createChatRoom}
        leaveChatroom={leaveChatroom}
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
          friends={currentUser.friendsID}
          sendRequestFriend={sendRequestFriend}
          removeFriend={removeFriend}
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
        currentUser={currentUser}
        friends={currentUser.friendsID}
        sendRequestFriend={sendRequestFriend}
        removeFriend={removeFriend}
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
  sendRequestFriend: PropTypes.func,
  removeFriend: PropTypes.func,
  addMember: PropTypes.func,
  leaveChatroom: PropTypes.func,
};

export default ChatPage;
