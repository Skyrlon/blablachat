import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import Chat from "../components/Chat.jsx";
import ChatRoomNav from "../components/ChatRoomNav.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import { getChatrooms, getCurrentChatroomId } from "../store/Selectors.jsx";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

const StyledChatPage = styled.div`
  position: relative;
  width: 100vw;
  height: 95vh;
  display: flex;
  flex-direction: row;
  & .nav {
    width: 10%;
    & a {
      color: inherit;
      text-decoration: inherit;
    }
  }
`;

const ChatPage = ({ isAuthentified }) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  const chatrooms = useSelector(getChatrooms());

  const currentChatroomId = useSelector(getCurrentChatroomId());

  if (!isAuthentified) {
    return <Redirect to="/connexion" />;
  }

  return (
    <StyledChatPage>
      <List className="nav">
        <ListItemButton>
          <Link to="/friends">Friends</Link>
        </ListItemButton>
        <Divider />
        {chatrooms.length > 0 && <ChatRoomNav chatrooms={chatrooms} />}
      </List>

      <Divider flexItem={true} orientation="vertical" />

      {chatrooms.length > 0 && currentChatroomId !== null && (
        <Chat
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
        />
      )}

      <Divider flexItem={true} orientation="vertical" />

      {chatrooms.length > 0 && currentChatroomId !== null && <MembersSidebar />}
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
};

export default ChatPage;
