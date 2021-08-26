import styled from "styled-components";

const StyledMembersSidebar = styled.div`
  grid-area: members;
  border: 1px solid;
  padding: 1rem;
  & .title {
    margin-bottom: 1rem;
  }
`;

const MembersSidebar = ({ members, users }) => {
  return (
    <StyledMembersSidebar>
      <div className="title">Members</div>
      {members.map((member) => (
        <div key={member}>
          {users.filter((user) => user.id === member)[0].name}
        </div>
      ))}
    </StyledMembersSidebar>
  );
};

export default MembersSidebar;
