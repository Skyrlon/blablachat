import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

import SelectFriendsDropdown from "./SelectFriendsDropdown";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserFriends } from "../store/Selectors";

const StyledAddChatRoom = styled.div`
  position: relative;
`;

const AddChatRoom = ({ userLoggedId, chatrooms, changeCurrentChatroom }) => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

  const handleFriendsSubmitted = (friendsSelected) => {
    const newChatroomMembers = [userLoggedId, ...friendsSelected];

    const chatroomWithSameMembers = chatrooms.find(
      (chatroom) =>
        chatroom.membersID.length === newChatroomMembers.length &&
        chatroom.membersID.every((member) =>
          newChatroomMembers.includes(member)
        )
    );

    if (!!chatroomWithSameMembers) {
      changeCurrentChatroom(chatroomWithSameMembers.id);
    } else {
      dispatch({
        type: "CREATE_CHATROOM",
        payload: {
          creator: userLoggedId,
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
  userLoggedId: PropTypes.number,
  chatrooms: PropTypes.array,
  changeCurrentChatroom: PropTypes.func,
};

export default AddChatRoom;
