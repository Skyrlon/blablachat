import styled from "styled-components";
import { Redirect } from "react-router";

const StyledFriendsList = styled.div``;

const FriendsList = ({ isAuthentified, friendsID, users }) => {
  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }
  return (
    <StyledFriendsList>
      {friendsID.map((id) => (
        <div key={id}>{users.filter((user) => user.id === id)[0].name}</div>
      ))}
      {friendsID.length === 0 && <div>You have no friends yet</div>}
    </StyledFriendsList>
  );
};

export default FriendsList;
