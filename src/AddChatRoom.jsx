import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";

const StyledAddChatRoom = styled.div`
  position: relative;
  & .menu {
    position: absolute;
    z-index: 100;
    background-color: white;
    border: 1px solid blue;
    left: 100%;
    & .friend {
      display: flex;
      flex-direction: row;
    }
  }
`;

const AddChatRoom = ({ friends, users, createChatRoom }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [friendsSelected, setFriendsSlected] = useState([]);

  const handleChange = (e, id) => {
    if (e.target.checked) {
      setFriendsSlected((prev) => [...prev, id]);
    } else {
      setFriendsSlected((prev) => prev.filter((element) => element !== id));
    }
  };

  const handleOnCreateClick = () => {
    createChatRoom(friendsSelected);
    setShowMenu(false);
    setFriendsSlected([]);
  };

  return (
    <StyledAddChatRoom>
      <AddIcon onClick={() => setShowMenu((v) => !v)} />
      {showMenu && (
        <div className="menu">
          {friends.length > 0 &&
            friends.map((id) => (
              <div className="friend" key={id}>
                <div className="friend-name">
                  {users.filter((user) => user.id === id)[0].name}
                </div>
                <Checkbox
                  className="friend-checkbox"
                  onChange={(e) => handleChange(e, id)}
                />
              </div>
            ))}
          <Button color="primary" onClick={handleOnCreateClick}>
            Create Chatroom
          </Button>
        </div>
      )}
    </StyledAddChatRoom>
  );
};

AddChatRoom.propTypes = {
  friends: PropTypes.array,
  users: PropTypes.array,
  createChatRoom: PropTypes.func,
};

export default AddChatRoom;
