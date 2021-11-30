import { useState, useRef } from "react";
import { Menu, MenuItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  contextMenu: { pointerEvents: "none" },
  contextMenuPaper: { pointerEvents: "auto" },
});

const NestedMenuItem = ({ children, label, left }) => {
  const classes = useStyles();

  const [showSubMenu, setShowSubMenu] = useState(false);

  const nestedMenuRef = useRef(null);

  return (
    <MenuItem
      ref={nestedMenuRef}
      onMouseEnter={() => setShowSubMenu(true)}
      onMouseLeave={() => setShowSubMenu(false)}
    >
      {label}
      {showSubMenu && (
        <Menu
          anchorEl={nestedMenuRef.current}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: "top",
            horizontal: left ? "left" : "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: left ? "right" : "left",
          }}
          PopoverClasses={{
            root: classes.contextMenu,
            paper: classes.contextMenuPaper,
          }}
          open={showSubMenu}
        >
          {children}
        </Menu>
      )}
    </MenuItem>
  );
};
export default NestedMenuItem;
