import styled from "styled-components";
import PropTypes from "prop-types";

import UserPseudo from "./UserPseudo";
import { getMembers } from "../store/Selectors";
import { useSelector } from "react-redux";

const StyledMembersSidebar = styled.div`
  grid-area: members;
  border: 1px solid;
  padding: 1rem;
  & .title {
    margin-bottom: 1rem;
  }
`;

const MembersSidebar = ({ users, currentUser, friends, currentChatroomId }) => {
  const members = useSelector(getMembers(currentChatroomId));
  return (
    <StyledMembersSidebar>
      <div className="title">Members</div>
      {members.map((member) => (
        <UserPseudo
          key={member.id}
          currentUser={currentUser}
          friends={friends}
          users={users}
        >
          {member.name}
        </UserPseudo>
      ))}
    </StyledMembersSidebar>
  );
};
MembersSidebar.propTypes = {
  members: PropTypes.array,
  users: PropTypes.array,
  currentUser: PropTypes.object,
  friends: PropTypes.array,
  currentChatroomId: PropTypes.number,
};
export default MembersSidebar;
