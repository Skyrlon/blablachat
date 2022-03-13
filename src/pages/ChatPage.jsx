import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";

import Chat from "../components/Chat.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import Divider from "@mui/material/Divider";

const StyledChatPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ChatPage = ({ isAuthentified }) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  if (!isAuthentified) {
    return <Redirect to="/connexion" />;
  }

  return (
    <StyledChatPage>
      <Chat
        showEmojis={showEmojis}
        switchShowEmojis={(e) => setShowEmojis(e)}
      />

      <Divider flexItem={true} orientation="vertical" />

      <MembersSidebar />
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
};

export default ChatPage;
