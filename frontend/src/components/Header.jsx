import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthentified } from "../store/Selectors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isAuthentified = useSelector(getIsAuthentified());

  const handleLogoutClick = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar>
        <Typography
          component="h1"
          onClick={() => navigate("/")}
          sx={{ color: "inherit", cursor: "pointer" }}
        >
          BlaBlaChat
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
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
