import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import SelectFriendsDropdown from "./SelectFriendsDropdown";
import { getCurrentUserFriends, getMembers } from "../store/Selectors";
import { useSelector } from "react-redux";

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

const AddMember = ({ addMember, currentChatroomId, userLoggedId }) => {
  const members = useSelector(getMembers(currentChatroomId));

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

  const [showMenu, setShowMenu] = useState(false);

  const handleFriendsSubmitted = (friendsSelected) => {
    addMember(friendsSelected);
    setShowMenu(false);
  };
  return (
    <StyledAddMember>
      <PersonAddIcon
        className="add-member"
        onClick={() => setShowMenu((v) => !v)}
      />
      {showMenu && (
        <SelectFriendsDropdown
          friends={friends.filter(
            (friend) => !members.map((member) => member.id).includes(friend)
          )}
          friendsSubmitted={handleFriendsSubmitted}
          closeMenu={() => setShowMenu(false)}
          buttonText="Add Member(s)"
        />
      )}
    </StyledAddMember>
  );
};

AddMember.propTypes = {
  addMember: PropTypes.func,
  currentChatroomId: PropTypes.number,
  userLoggedId: PropTypes.number,
};

export default AddMember;
