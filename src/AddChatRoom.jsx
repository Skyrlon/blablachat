import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

import SelectFriendsDropdown from "./SelectFriendsDropdown";

const StyledAddChatRoom = styled.div`
  position: relative;
`;

const AddChatRoom = ({ friends, users, createChatRoom }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleFriendsSubmitted = (friendsSelected) => {
    createChatRoom(friendsSelected);
    setShowMenu(false);
  };

  return (
    <StyledAddChatRoom>
      <AddIcon onClick={() => setShowMenu((v) => !v)} />
      {showMenu && (
        <SelectFriendsDropdown
          friends={friends}
          users={users}
          friendsSubmitted={handleFriendsSubmitted}
          closeMenu={() => setShowMenu(false)}
          buttonText="Create Chatroom"
        />
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
