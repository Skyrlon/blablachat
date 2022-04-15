import styled from "styled-components";
import Chat from "../components/Chat.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import Divider from "@mui/material/Divider";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthentified } from "../store/Selectors.jsx";

const StyledChatPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ChatPage = () => {
  let navigate = useNavigate();

  const isAuthentified = useSelector(getIsAuthentified());

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
              <Chat />
              <Divider flexItem={true} orientation="vertical" />
              <MembersSidebar />
            </>
          }
        />
      </Routes>
    </StyledChatPage>
  );
};

export default ChatPage;
