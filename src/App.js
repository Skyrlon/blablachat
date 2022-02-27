import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
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

  const handleSignIn = (userId) => {
    dispatch({ type: "LOAD_USER", payload: { id: userId } });
  };

  const handleLogout = () => {
    setUserLoggedId(undefined);
    setIsAuthentified(false);
  };

  useEffect(() => {
    if (currentUserId !== undefined) {
      setUserLoggedId(currentUserId);
      setIsAuthentified(true);
    }
  }, [currentUserId]);

  useEffect(
    () => {
      if (userLoggedId !== undefined && isAuthentified) {
        return <Redirect to="/" />;
      }
    },
    // eslint-disable-next-line
    [userLoggedId]
  );

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
                onSuccessfulSignIn={handleSignIn}
                isAuthentified={isAuthentified}
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
