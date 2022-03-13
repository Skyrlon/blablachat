import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId } from "./store/Selectors.jsx";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ConnexionPage from "./pages/ConnexionPage.jsx";
import HomePage from "./pages/HomePage.jsx";

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
        <Switch>
          <Route path="/connexion">
            <ConnexionPage isAuthentified={isAuthentified} />
          </Route>

          <Route path="/">
            <HomePage isAuthentified={isAuthentified} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
