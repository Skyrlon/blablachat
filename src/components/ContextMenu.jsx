import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { makeStyles } from "@mui/styles";
import NestedMenuItem from "./NestedMenuItem";

const useStyles = makeStyles({
  contextMenu: { pointerEvents: "none" },
  contextMenuPaper: { pointerEvents: "auto" },
});

const ContextMenu = ({
  showMenu,
  anchorEl,
  position,
  closeMenu,
  menuContent,
  menuEvent,
}) => {
  const classes = useStyles();

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={closeMenu}>
      <Menu
        PopoverClasses={{
          root: classes.contextMenu,
          paper: classes.contextMenuPaper,
        }}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{ top: position.y, left: position.x }}
        transformOrigin={{
          vertical: "top",
          horizontal: position.x > window.innerWidth / 2 ? "right" : "left",
        }}
        open={showMenu}
        onClose={closeMenu}
        autoFocus={false}
      >
        {menuContent.map(
          (content) =>
            (content.available && !content.children && (
              <MenuItem
                key={content.label}
                onClick={() =>
                  content.clickEvent && menuEvent(content.clickEvent())
                }
                autoFocus={false}
              >
                {content.label}
              </MenuItem>
            )) ||
            (content.available && content.children && (
              <NestedMenuItem
                key={content.label}
                label={content.label}
                left={true}
                autoFocus={false}
              >
                {content.children.map((child) => (
                  <MenuItem
                    onClick={() => menuEvent(child.clickEvent())}
                    key={child.id}
                    autoFocus={false}
                  >
                    {child.label}
                  </MenuItem>
                ))}
              </NestedMenuItem>
            ))
        )}
      </Menu>
    </ClickAwayListener>
  );
};

ContextMenu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element).isRequired,
  position: PropTypes.object.isRequired,
  closeMenu: PropTypes.func.isRequired,
  menuContent: PropTypes.array.isRequired,
  menuEvent: PropTypes.func.isRequired,
};

export default ContextMenu;
