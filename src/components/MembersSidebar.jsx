import styled from "styled-components";
import PropTypes from "prop-types";

import UserPseudo from "./UserPseudo";
import {
  getMembers,
  getCharoomOwnerId,
  getCurrentUserId,
} from "../store/Selectors";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { ListItemButton, ListItemIcon } from "@mui/material";

const StyledMembersSidebar = styled(List)`
  width: 10%;
`;

const MembersSidebar = ({ currentChatroomId }) => {
  const currentUserId = useSelector(getCurrentUserId());

  const members = useSelector(getMembers(currentChatroomId));

  const ownerID = useSelector(getCharoomOwnerId(currentChatroomId));

  return (
    <StyledMembersSidebar
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Members ({members.length})
        </ListSubheader>
      }
    >
      {members.map((member) => (
        <ListItemButton key={member.id}>
          <UserPseudo userId={member.id} currentUserId={currentUserId}>
            {member.name}
          </UserPseudo>
          {member.id === ownerID && (
            <ListItemIcon>
              <FontAwesomeIcon icon={faCrown} />
            </ListItemIcon>
          )}
        </ListItemButton>
      ))}
    </StyledMembersSidebar>
  );
};
MembersSidebar.propTypes = {
  currentChatroomId: PropTypes.number,
};
export default MembersSidebar;
