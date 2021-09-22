import styled from "styled-components";
import PropTypes from "prop-types";

import UserPseudo from "./UserPseudo";

const StyledMembersSidebar = styled.div`
  grid-area: members;
  border: 1px solid;
  padding: 1rem;
  & .title {
    margin-bottom: 1rem;
  }
`;

const MembersSidebar = ({
  members,
  users,
  currentUser,
  friends,
  removeFriend,
}) => {
  return (
    <StyledMembersSidebar>
      <div className="title">Members</div>
      {members.map((member) => (
        <UserPseudo
          key={member}
          currentUser={currentUser}
          friends={friends}
          users={users}
          removeFriend={removeFriend}
        >
          {users.filter((user) => user.id === member)[0].name}
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
  removeFriend: PropTypes.func,
};
export default MembersSidebar;
