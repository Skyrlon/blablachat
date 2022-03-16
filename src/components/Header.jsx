import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthentified } from "../store/Selectors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header = () => {
  const dispatch = useDispatch();

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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
