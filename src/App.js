import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getCurrentUserId } from "./store/Selectors.jsx";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ChatPage from "./pages/ChatPage.jsx";
import FriendsPage from "./pages/FriendsPage";
import SignIn from "./pages/SignIn.jsx";

const App = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const [isAuthentified, setIsAuthentified] = useState(false);

  const users = useSelector(getUsers());

  const [userLoggedId, setUserLoggedId] = useState(undefined);

  const handleAddUser = (signupInfos) => {
    dispatch({
      type: "CREATE_NEW_USER",
      payload: { name: signupInfos.name, password: signupInfos.password },
    });
  };

  const handleLogout = () => {
    setUserLoggedId(undefined);
    setIsAuthentified(false);
  };

  useEffect(() => {
    if (currentUserId) {
      setUserLoggedId(currentUserId);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (userLoggedId) setIsAuthentified(true);
  }, [userLoggedId]);

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      {isAuthentified && <Logout onLogoutClick={handleLogout} />}
      <Router>
        <div>
          {isAuthentified && (
            <nav>
              <ul>
                <li>
                  <Link to="/">Chat</Link>
                </li>
                <li>
                  <Link to="/friends">Friends</Link>
                </li>
              </ul>
            </nav>
          )}

          <Switch>
            <Route path="/sign">
              <SignIn
                users={users}
                addUser={handleAddUser}
                onSuccessfulSignIn={(userId) => {
                  setUserLoggedId(userId);
                  setIsAuthentified(true);
                }}
              />
            </Route>
            <Route path="/friends">
              <FriendsPage
                userLoggedId={userLoggedId}
                isAuthentified={isAuthentified}
              />
            </Route>
            <Route path="/">
              <ChatPage
                isAuthentified={isAuthentified}
                userLoggedId={userLoggedId}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
