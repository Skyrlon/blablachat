import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";

const StyledAddMember = styled.div`
  position: absolute;
  top: -2rem;
  right: 8vw;
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

const AddMember = ({ addMember, friends, members, users }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [friendsSelected, setFriendsSelected] = useState([]);

  const handleChange = (e, id) => {
    if (e.target.checked) {
      setFriendsSelected((prev) => [...prev, id]);
    } else {
      setFriendsSelected((prev) => prev.filter((element) => element !== id));
    }
  };

  const handleOnAddClick = () => {
    addMember(friendsSelected);
    setShowMenu(false);
    setFriendsSelected([]);
  };
  return (
    <StyledAddMember>
      <PersonAddIcon
        className="add-member"
        onClick={() => setShowMenu((v) => !v)}
      />
      {showMenu && (
        <div className="menu">
          {friends.length > 0 &&
            friends.map(
              (id) =>
                !members.includes(id) && (
                  <div className="friend" key={id}>
                    <div className="friend-name">
                      {users.filter((user) => user.id === id)[0].name}
                    </div>
                    <Checkbox
                      className="friend-checkbox"
                      onChange={(e) => handleChange(e, id)}
                    />
                  </div>
                )
            )}

          <Button color="primary" onClick={handleOnAddClick}>
            Add Member(s)
          </Button>
        </div>
      )}
    </StyledAddMember>
  );
};

AddMember.propTypes = {
  friends: PropTypes.array,
  users: PropTypes.array,
  createChatRoom: PropTypes.func,
  members: PropTypes.array,
  addMember: PropTypes.func,
};

export default AddMember;
