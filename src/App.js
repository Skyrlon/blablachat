import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIsAuthentified } from "./store/Selectors.jsx";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ConnexionPage from "./pages/ConnexionPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const App = () => {
  const dispatch = useDispatch();

  const isAuthentified = useSelector(getIsAuthentified());

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      {isAuthentified && <Logout onLogoutClick={handleLogout} />}
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route
          path="/connexion"
          element={!isAuthentified ? <ConnexionPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
