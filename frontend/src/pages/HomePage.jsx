import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import ChatRoomNav from "../components/ChatRoomNav.jsx";
import {
  getChatrooms,
  getCurrentChatroomId,
  getIsAuthentified,
} from "../store/Selectors.jsx";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import FriendsPage from "./FriendsPage.jsx";
import ChatPage from "./ChatPage.jsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from "@mui/icons-material/People";

const StyledHomePage = styled.div`
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
  & .content {
    width: 90%;
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();

  const chatrooms = useSelector(getChatrooms());

  const isAuthentified = useSelector(getIsAuthentified());

  const currentChatromId = useSelector(getCurrentChatroomId());

  if (!isAuthentified) {
    return <Navigate to="/connexion" />;
  }

  const onFriendItemClick = () => {
    dispatch({ type: "CHANGE_CURRENT_CHATROOM", payload: { id: undefined } });
  };

  return (
    <StyledHomePage>
      <List className="nav">
        <ListItemButton
          component={Link}
          to="/"
          onClick={onFriendItemClick}
          selected={currentChatromId === undefined}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItemButton>
        <Divider />
        <ChatRoomNav chatrooms={chatrooms} />
      </List>

      <Divider flexItem={true} orientation="vertical" />

      <div className="content">
        <Routes>
          <Route
            exact
            path="*"
            element={<FriendsPage isAuthentified={isAuthentified} />}
          />
          <Route
            path="chatrooms/*"
            element={<ChatPage isAuthentified={isAuthentified} />}
          />
        </Routes>
      </div>
    </StyledHomePage>
  );
};

export default HomePage;
