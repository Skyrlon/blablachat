import { useState } from "react";
import styled from "styled-components";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthentified } from "../store/Selectors";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const StyledConnexionPage = styled(Container)``;

const ConnexionPage = () => {
  const isAuthentified = useSelector(getIsAuthentified());

  let navigate = useNavigate();

  if (isAuthentified) {
    navigate("/");
  }

  const [displayLogIn, setDisplayLogIn] = useState(true);

  return (
    <StyledConnexionPage component="main" sx={{ maxWidth: "xs" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {displayLogIn ? "Log in" : "Sign Up"}
        </Typography>
        {displayLogIn && <LogIn />}
        {!displayLogIn && <SignUp />}
        <Link data-testid="link" onClick={() => setDisplayLogIn((v) => !v)}>
          {displayLogIn
            ? "Don't have an account yet ? Create One !"
            : "Already have an account ? Log In !"}
        </Link>
      </Box>
    </StyledConnexionPage>
  );
};

export default ConnexionPage;
