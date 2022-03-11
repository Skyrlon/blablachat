import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Chat from "../components/Chat.jsx";
import ChatRoomNav from "../components/ChatRoomNav.jsx";
import SendMessage from "../components/SendMessage.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import AddMember from "../components/AddMember.jsx";
import { getChatrooms } from "../store/Selectors.jsx";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

const StyledChatPage = styled.div`
  position: relative;
  width: 100vw;
  height: 95vh;
  display: grid;
  grid-template:
    "nav chat members" auto
    "nav chat members" auto
    "nav send members" 5% / 10vw auto 7vw;
  & .nav {
    grid-area: nav;
    & a {
      color: inherit;
      text-decoration: inherit;
    }
  }
`;

const ChatPage = ({ isAuthentified }) => {
  const dispatch = useDispatch();

  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  const chatrooms = useSelector(getChatrooms());

  const [currentChatroomId, setCurrentChatroomId] = useState(
    chatrooms.length > 0 ? chatrooms[0].id : null
  );

  const handleChangeCurrentChatroom = (chatroomId) => {
    setCurrentChatroomId(chatroomId);
  };

  const handleAddMember = (chatroomId, friendsSelected) => {
    dispatch({
      type: "ADD_MEMBER",
      payload: { newMember: friendsSelected, chatroomId: chatroomId },
    });
  };

  const handleLeaveCurrentChatroom = (chatroomId) => {
    setCurrentChatroomId(
      chatrooms.find((chatroom) => chatroom.id !== chatroomId).id
    );
  };

  if (!isAuthentified) {
    return <Redirect to="/connexion" />;
  }

  return (
    <StyledChatPage>
      {chatrooms.length > 0 && (
        <AddMember
          addMember={(ids) => handleAddMember(currentChatroomId, ids)}
          currentChatroomId={currentChatroomId}
        />
      )}

      <List className="nav">
        <ListItemButton>
          <Link to="/friends">Friends</Link>
        </ListItemButton>
        <Divider />
        {chatrooms.length > 0 && (
          <ChatRoomNav
            chatrooms={chatrooms}
            changeCurrentChatroom={handleChangeCurrentChatroom}
            currentChatroomId={currentChatroomId}
            leaveCurrentChatroom={handleLeaveCurrentChatroom}
          />
        )}
      </List>

      {chatrooms.length > 0 && (
        <Chat
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
        />
      )}

      {chatrooms.length > 0 && (
        <SendMessage
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
        />
      )}

      {chatrooms.length > 0 && (
        <MembersSidebar currentChatroomId={currentChatroomId} />
      )}
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
};

export default ChatPage;
