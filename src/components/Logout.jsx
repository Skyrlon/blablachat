import styled from "styled-components";
import PropTypes from "prop-types";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
      <ExitToAppIcon />
      <div>Logout</div>
    </StyledLogout>
  );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func,
};

export default Logout;
