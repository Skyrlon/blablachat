import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  isAuthentified,
  currentUser,
  users,
  sendRequestFriend,
  removeFriend,
}) => {
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  const storeChatrooms = useSelector((state) =>
    state.chatrooms.filter((chatroom) =>
      chatroom.membersID.includes(currentUser.id)
    )
  );
  const [chatrooms, setChatrooms] = useState(storeChatrooms);
  const [currentChatroom, setCurrentChatroom] = useState(
    chatrooms.length > 0 ? chatrooms[0].id : null
  );

  const handleChangeChatroom = (chatroomId) => {
    setCurrentChatroom(chatroomId);
  };

  const handleCreateChatroom = (friendsSelected) => {
    setChatrooms((prev) => [
      ...prev,
      {
        id: prev.length,
        name: `Chatroom ${prev.length}`,
        membersID: [currentUser.id, ...friendsSelected],
        message: [],
      },
    ]);
    dispatch({
      type: "CREATE_CHATROOM",
      payload: { members: [currentUser.id, ...friendsSelected] },
    });
  };

  const handleAddMember = (chatroomId, friendsSelected) => {
    const newChatrooms = chatrooms.map((chatroom) => {
      if (chatroom.id === chatroomId)
        return {
          ...chatroom,
          membersID: [...chatroom.membersID, ...friendsSelected],
        };
      return chatroom;
    });
    setChatrooms([...newChatrooms]);
    dispatch({
      type: "ADD_MEMBER",
      payload: { newMember: friendsSelected, chatroomId: chatroomId },
    });
  };

  const handleLeaveChatroom = (chatroomId) => {
    const newChatrooms = chatrooms.map((chatroom) => {
      if (chatroom.id === chatroomId)
        return {
          ...chatroom,
          membersID: chatroom.membersID.filter(
            (member) => member !== currentUser.id
          ),
        };
      return chatroom;
    });
    setChatrooms([...newChatrooms]);
    dispatch({
      type: "LEAVE_CHATROOM",
      payload: { chatroomId, userLeaving: currentUser.id },
    });
  };

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }

  return (
    <StyledChatPage>
      {chatrooms.length > 0 && (
        <AddMember
          addMember={(ids) => handleAddMember(currentChatroom, ids)}
          friends={currentUser.friendsID}
          members={
            chatrooms.filter((chatroom) => chatroom.id === currentChatroom)[0]
              .membersID
          }
          users={users}
        />
      )}
      <ChatRoomNav
        chatrooms={chatrooms}
        friends={currentUser.friendsID}
        currentUser={currentUser}
        users={users}
        chatRooms={chatrooms}
        changeChatRoom={handleChangeChatroom}
        currentChatRoom={currentChatroom}
        createChatRoom={handleCreateChatroom}
        leaveChatroom={handleLeaveChatroom}
      />
      {chatrooms.length > 0 && (
        <Chat
          users={users}
          currentUser={currentUser}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          friends={currentUser.friendsID}
          sendRequestFriend={sendRequestFriend}
          removeFriend={removeFriend}
          currentChatRoom={currentChatroom}
        />
      )}
      {chatrooms.length > 0 && (
        <SendMessage
          currentUser={currentUser}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatRoom={currentChatroom}
        />
      )}
      <MembersSidebar
        users={users}
        members={
          chatrooms.filter((chatroom) => chatroom.id === currentChatroom)[0]
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
  isAuthentified: PropTypes.bool,
  currentUser: PropTypes.object,
  users: PropTypes.array,
  sendRequestFriend: PropTypes.func,
  removeFriend: PropTypes.func,
};

export default ChatPage;
