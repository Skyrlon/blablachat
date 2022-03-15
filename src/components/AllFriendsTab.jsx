import styled from "styled-components";
import { useSelector } from "react-redux";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import UserPseudo from "./UserPseudo";
import { getCurrentUserFriends } from "../store/Selectors";

const StyledAllFriendsTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AllFriendsTab = () => {
  const friends = useSelector(getCurrentUserFriends());

  return (
    <StyledAllFriendsTab>
      <List
        sx={{ width: "98%" }}
        component="div"
        subheader={
          <ListSubheader component="div">
            All Friends - {friends.length}
          </ListSubheader>
        }
      >
        {friends.length > 0 &&
          friends.map((friend) => (
            <div key={friend.id}>
              <Divider />
              <ListItemButton>
                <UserPseudo userId={friend.id} />
              </ListItemButton>
            </div>
          ))}
        {friends.length === 0 && <div>You have no friends yet</div>}
      </List>
    </StyledAllFriendsTab>
  );
};

export default AllFriendsTab;
