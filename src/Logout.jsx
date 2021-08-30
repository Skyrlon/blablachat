import styled from "styled-components";
import PropTypes from "prop-types";
import { ExitToApp } from "@material-ui/icons";

const StyledLogout = styled.div`
  position: absolute;
  right: 2rem;
  top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logout = ({ onLogoutClick }) => {
  return (
    <StyledLogout onClick={onLogoutClick}>
      <ExitToApp />
      <div>Logout</div>
    </StyledLogout>
  );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func,
};

export default Logout;
