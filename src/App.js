import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      {isAuthentified && <Logout onLogoutClick={handleLogout} />}
      <Routes>
        <Route
          path="*"
          element={<HomePage isAuthentified={isAuthentified} />}
        />
        <Route
          path="/connexion"
          element={<ConnexionPage isAuthentified={isAuthentified} />}
        />
      </Routes>
    </div>
  );
};

export default App;
