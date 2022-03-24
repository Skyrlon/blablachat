import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const StyledSelectFriendsDropdown = styled(List)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  border: 1px solid grey;
  left: 0%;
  & .friend {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-name {
      cursor: pointer;
      user-select: none;
    }
  }
`;

const SelectFriendsDropdown = ({
  friends,
  friendsSubmitted,
  closeMenu,
  buttonText,
}) => {
  const [friendsSelected, setFriendsSelected] = useState([]);

  const onFriendNameClick = (id) => {
    if (friendsSelected.includes(id)) {
      setFriendsSelected((prev) => prev.filter((element) => element !== id));
    } else {
      setFriendsSelected((prev) => [...prev, id]);
    }
  };

  const handleSubmit = () => {
    friendsSubmitted(friendsSelected);
    setFriendsSelected([]);
  };

  const handleClickAway = () => {
    closeMenu();
    setFriendsSelected([]);
  };

  useEffect(() => {
    return () => setFriendsSelected([]);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <StyledSelectFriendsDropdown
        sx={{ bgcolor: "background.paper" }}
        data-testid="select-friends-dropdown"
      >
        {!!friends &&
          friends.length > 0 &&
          friends.map((friend) => (
            <ListItem key={friend.id} disablePadding>
              <ListItemButton onClick={() => onFriendNameClick(friend.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={friendsSelected.includes(friend.id)}
                  />
                </ListItemIcon>
                <ListItemText>{friend.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}

        {(!friends || friends.length === 0) && (
          <ListItem>
            <ListItemText>No Friends to Add</ListItemText>
          </ListItem>
        )}

        <Button
          variant="contained"
          color="primary"
          disabled={friendsSelected.length === 0}
          sx={{ textTransform: "none" }}
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </StyledSelectFriendsDropdown>
    </ClickAwayListener>
  );
};

SelectFriendsDropdown.propTypes = {
  friends: PropTypes.array,
  friendsSubmitted: PropTypes.func,
  closeMenu: PropTypes.func,
  buttonText: PropTypes.string,
};

export default SelectFriendsDropdown;
