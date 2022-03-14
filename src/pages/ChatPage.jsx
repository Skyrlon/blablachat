import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";

import Chat from "../components/Chat.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import Divider from "@mui/material/Divider";
import { Route, Routes, useNavigate } from "react-router-dom";

const StyledChatPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ChatPage = ({ isAuthentified }) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  let navigate = useNavigate();

  if (!isAuthentified) {
    navigate("/connexion");
  }

  return (
    <StyledChatPage>
      <Routes>
        <Route
          path=":id"
          element={
            <>
              <Chat
                showEmojis={showEmojis}
                switchShowEmojis={(e) => setShowEmojis(e)}
              />
              <Divider flexItem={true} orientation="vertical" />
              <MembersSidebar />
            </>
          }
        />
      </Routes>
    </StyledChatPage>
  );
};

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
};

export default ChatPage;
