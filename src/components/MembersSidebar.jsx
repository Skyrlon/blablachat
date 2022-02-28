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

const StyledMembersSidebar = styled.div`
  grid-area: members;
  border: 1px solid;
  padding: 1rem;
  & .title {
    margin-bottom: 1rem;
  }
  & .member {
    display: flex;
    flex-direction: row;
  }
`;

const MembersSidebar = ({ currentChatroomId }) => {
  const currentUserId = useSelector(getCurrentUserId());

  const members = useSelector(getMembers(currentChatroomId));

  const ownerID = useSelector(getCharoomOwnerId(currentChatroomId));

  return (
    <StyledMembersSidebar>
      <div className="title">Members ({members.length})</div>
      {members.map((member) => (
        <div className="member" key={member.id}>
          <UserPseudo userId={member.id} currentUserId={currentUserId}>
            {member.name}
          </UserPseudo>
          {member.id === ownerID && <FontAwesomeIcon icon={faCrown} />}
        </div>
      ))}
    </StyledMembersSidebar>
  );
};
MembersSidebar.propTypes = {
  currentChatroomId: PropTypes.number,
};
export default MembersSidebar;
