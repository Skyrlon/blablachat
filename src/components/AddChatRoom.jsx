import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

import SelectFriendsDropdown from "./SelectFriendsDropdown";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserFriends } from "../store/Selectors";

const StyledAddChatRoom = styled.div`
  position: relative;
`;

const AddChatRoom = ({ userLoggedId }) => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

  const handleFriendsSubmitted = (friendsSelected) => {
    dispatch({
      type: "CREATE_CHATROOM",
      payload: {
        creator: userLoggedId,
        members: [userLoggedId, ...friendsSelected],
      },
    });
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
};

export default AddChatRoom;
