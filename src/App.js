import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthentified } from "./store/Selectors.jsx";

import ConnexionPage from "./pages/ConnexionPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Header from "./components/Header.jsx";
import Divider from "@mui/material/Divider";

const App = () => {
  const isAuthentified = useSelector(getIsAuthentified());

  return (
    <div className="App">
      <Header />
      {isAuthentified && <Divider />}
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
