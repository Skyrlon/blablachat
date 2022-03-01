import styled from "styled-components";
import { useSelector } from "react-redux";

import UserPseudo from "./UserPseudo";
import { getCurrentUserFriends } from "../store/Selectors";

const StyledAllFriendsTab = styled.div``;

const AllFriendsTab = () => {
  const friends = useSelector(getCurrentUserFriends());

  return (
    <StyledAllFriendsTab>
      {friends.length > 0 &&
        friends.map((friend) => (
          <UserPseudo key={friend.id} userId={friend.id} />
        ))}
      {friends.length === 0 && <div>You have no friends yet</div>}
    </StyledAllFriendsTab>
  );
};

export default AllFriendsTab;
