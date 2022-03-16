import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthentified } from "../store/Selectors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isAuthentified = useSelector(getIsAuthentified());

  const handleLogoutClick = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <AppBar
      position={isAuthentified ? "sticked" : "fixed"}
      elevation={0}
      sx={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar>
        <Typography
          component="h1"
          onClick={() => navigate("/")}
          sx={{ flexGrow: 1, color: "inherit", cursor: "pointer" }}
        >
          BlaBlaChat
        </Typography>
        {isAuthentified && (
          <IconButton size="large" color="inherit" onClick={handleLogoutClick}>
            <ExitToAppIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
