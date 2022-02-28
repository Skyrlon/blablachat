import styled from "styled-components";
import { useSelector } from "react-redux";

import UserPseudo from "./UserPseudo";
import { getCurrentUserId, getCurrentUserFriends } from "../store/Selectors";

const StyledAllFriendsTab = styled.div``;

const AllFriendsTab = () => {
  const currentUserId = useSelector(getCurrentUserId());

  const friends = useSelector(getCurrentUserFriends(currentUserId));

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
