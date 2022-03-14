import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import ChatRoomNav from "../components/ChatRoomNav.jsx";
import { getChatrooms } from "../store/Selectors.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import FriendsPage from "./FriendsPage.jsx";
import ChatPage from "./ChatPage.jsx";

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

const HomePage = ({ isAuthentified }) => {
  const chatrooms = useSelector(getChatrooms());

  if (!isAuthentified) {
    return <Redirect to="/connexion" />;
  }
  return (
    <StyledHomePage>
      <List className="nav">
        <ListItem component={Link} to="/">
          <ListItemButton>Friends</ListItemButton>
        </ListItem>
        <Divider />
        <ChatRoomNav chatrooms={chatrooms} />
      </List>

      <Divider flexItem={true} orientation="vertical" />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <FriendsPage isAuthentified={isAuthentified} />
          </Route>
          <Route path="/chatrooms">
            <ChatPage isAuthentified={isAuthentified} />
          </Route>
        </Switch>
      </div>
    </StyledHomePage>
  );
};

HomePage.propTypes = {
  isAuthentified: PropTypes.bool.isRequired,
};

export default HomePage;
