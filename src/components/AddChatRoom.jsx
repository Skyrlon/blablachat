import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

import SelectFriendsDropdown from "./SelectFriendsDropdown";
import { useSelector } from "react-redux";
import { getCurrentUserFriends } from "../store/Selectors";

const StyledAddChatRoom = styled.div`
  position: relative;
`;

const AddChatRoom = ({ createChatRoom, userLoggedId }) => {
  const [showMenu, setShowMenu] = useState(false);

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

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
          friendsSubmitted={handleFriendsSubmitted}
          closeMenu={() => setShowMenu(false)}
          buttonText="Create Chatroom"
        />
      )}
    </StyledAddChatRoom>
  );
};

AddChatRoom.propTypes = {
  userLoggedId: PropTypes.number,
  createChatRoom: PropTypes.func,
};

export default AddChatRoom;
