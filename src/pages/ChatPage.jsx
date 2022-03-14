import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";

import Chat from "../components/Chat.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import Divider from "@mui/material/Divider";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const StyledChatPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ChatPage = ({ isAuthentified }) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  let { path } = useRouteMatch();

  if (!isAuthentified) {
    return <Redirect to="/connexion" />;
  }
  console.log(path);

  return (
    <StyledChatPage>
      <Switch>
        <Route path={`${path}/:id`}>
          <Chat
            showEmojis={showEmojis}
            switchShowEmojis={(e) => setShowEmojis(e)}
          />
          <Divider flexItem={true} orientation="vertical" />
          <MembersSidebar />
        </Route>
      </Switch>
    </StyledChatPage>
  );
};

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
};

export default ChatPage;
