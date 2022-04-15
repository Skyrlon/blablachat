import { useState, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  contextMenu: { pointerEvents: "none" },
  contextMenuPaper: { pointerEvents: "auto" },
});

const NestedMenuItem = ({ children, label, showOnLeft }) => {
  const classes = useStyles();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const nestedMenuRef = useRef(null);

  return (
    <MenuItem
      ref={nestedMenuRef}
      onMouseEnter={(e) => {
        setShowSubMenu(true);
        e.target.style.backgroundColor = "lightgrey";
      }}
      onMouseLeave={(e) => {
        setShowSubMenu(false);
        e.target.style.backgroundColor = "white";
      }}
      autoFocus={false}
    >
      {label}
      {showSubMenu && (
        <Menu
          anchorEl={nestedMenuRef.current}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: "top",
            horizontal: showOnLeft ? "left" : "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: showOnLeft ? "right" : "left",
          }}
          PopoverClasses={{
            root: classes.contextMenu,
            paper: classes.contextMenuPaper,
          }}
          open={showSubMenu}
          autoFocus={false}
        >
          {children}
        </Menu>
      )}
    </MenuItem>
  );
};
export default NestedMenuItem;
