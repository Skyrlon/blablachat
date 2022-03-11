import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";

const StyledConnexionPage = styled.div`
  margin: 0 auto;
  width: 20%;
`;

const ConnexionPage = ({ isAuthentified }) => {
  const [displayLogIn, setDisplayLogIn] = useState(true);

  if (isAuthentified) {
    return <Redirect to="/" />;
  }

  return (
    <StyledConnexionPage>
      {displayLogIn && <LogIn />}
      {!displayLogIn && <SignUp />}

      <div onClick={() => setDisplayLogIn((v) => !v)}>
        {displayLogIn
          ? "Don't have an account yet ? Create One !"
          : "Already have an account ? Log In !"}
      </div>
    </StyledConnexionPage>
  );
};

ConnexionPage.propTypes = {
  isAuthentified: PropTypes.bool.isRequired,
};

export default ConnexionPage;
