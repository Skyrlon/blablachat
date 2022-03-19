import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const StyledSelectFriendsDropdown = styled.form`
  position: absolute;
  z-index: 100;
  background-color: white;
  border: 1px solid blue;
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

  const handleChange = (e, id) => {
    if (e.target.checked) {
      setFriendsSelected((prev) => [...prev, id]);
    } else {
      setFriendsSelected((prev) => prev.filter((element) => element !== id));
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
      <StyledSelectFriendsDropdown>
        {!!friends &&
          friends.length > 0 &&
          friends.map((friend) => (
            <div className="friend" key={friend.id}>
              <div
                onClick={() => onFriendNameClick(friend.id)}
                className="friend-name"
              >
                {friend.name}
              </div>
              <Checkbox
                className="friend-checkbox"
                checked={friendsSelected.includes(friend.id)}
                onChange={(e) => handleChange(e, friend.id)}
              />
            </div>
          ))}

        {(!friends || friends.length === 0) && <div>No Friends to Add</div>}

        <Button color="primary" onClick={handleSubmit}>
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
