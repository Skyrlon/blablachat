import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId } from "./store/Selectors.jsx";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ChatPage from "./pages/ChatPage.jsx";
import FriendsPage from "./pages/FriendsPage";
import ConnexionPage from "./pages/ConnexionPage.jsx";

const App = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const [isAuthentified, setIsAuthentified] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  useEffect(() => {
    if (currentUserId !== undefined) {
      setIsAuthentified(true);
    } else {
      setIsAuthentified(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (isAuthentified) {
      return <Redirect to="/" />;
    }
  }, [isAuthentified]);

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
            <Route path="/connexion">
              <ConnexionPage isAuthentified={isAuthentified} />
            </Route>

            <Route path="/friends">
              <FriendsPage isAuthentified={isAuthentified} />
            </Route>
            <Route path="/">
              <ChatPage isAuthentified={isAuthentified} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
