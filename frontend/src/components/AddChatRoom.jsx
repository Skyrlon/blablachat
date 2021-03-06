import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

import SelectFriendsDropdown from "./SelectFriendsDropdown";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId, getCurrentUserFriends } from "../store/Selectors";

const StyledAddChatRoom = styled.div`
  position: relative;
`;

const AddChatRoom = ({ chatrooms }) => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const [showMenu, setShowMenu] = useState(false);

  const friends = useSelector(getCurrentUserFriends());

  const handleFriendsSubmitted = (friendsSelected) => {
    const newChatroomMembers = [currentUserId, ...friendsSelected];

    const chatroomWithSameMembers = chatrooms?.find(
      (chatroom) =>
        chatroom.membersID.length === newChatroomMembers.length &&
        chatroom.membersID.every((member) =>
          newChatroomMembers.includes(member)
        )
    );

    if (!!chatroomWithSameMembers) {
      dispatch({
        type: "CHANGE_CURRENT_CHATROOM",
        payload: { id: chatroomWithSameMembers.id },
      });
    } else {
      dispatch({
        type: "CREATE_CHATROOM",
        payload: {
          members: newChatroomMembers,
        },
      });
    }
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
  chatrooms: PropTypes.array,
};

export default AddChatRoom;
