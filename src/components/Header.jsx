import { ExitToApp } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthentified } from "../store/Selectors";

const Header = () => {
  const dispatch = useDispatch();

  const isAuthentified = useSelector(getIsAuthentified());

  const handleLogoutClick = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black" }}
        >
          BlaBlaChat
        </Typography>
        {isAuthentified && (
          <IconButton size="large" color="inherit" onClick={handleLogoutClick}>
            <ExitToApp />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
