import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { getUsers } from "../store/Selectors";

const axios = require("axios");

const StyledSignIn = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const SignIn = ({ isAuthentified }) => {
  const dispatch = useDispatch();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/gi;

  const users = useSelector(getUsers());

  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [usernameSubmitted, setUsernameSubmitted] = useState(undefined);
  const [passwordSubmitted, setPasswordSubmitted] = useState(undefined);
  const [passwordConfirmSubmitted, setPasswordConfirmSubmitted] =
    useState(undefined);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUsernameSubmitted(username);
    setPasswordSubmitted(password);
    setPasswordConfirmSubmitted(passwordConfirm);
    if (!signIn) {
      if (
        username.length < 6 ||
        !users.find((user) => user.name === usernameSubmitted) ||
        !passwordRegex.test(password)
      ) {
        setIsLoading(false);
      } else {
        dispatch({
          type: "CREATE_NEW_USER",
          payload: { name: username, password: password },
        });
        setIsLoading(false);
        alert("Account Created");
      }
    } else {
      setTimeout(() => {
        axios
          .get(
            `http://localhost:3004/users?name=${username}&password=${password}`
          )
          .then((response) => {
            dispatch({
              type: "LOAD_USER",
              payload: { id: response.data[0].id },
            });
          })
          .catch(() => {
            setIsLoading(false);
            alert("No account found");
          });
      }, 1000);
    }
  };

  if (isAuthentified) {
    return <Redirect to="/" />;
  }

  return (
    <StyledSignIn onSubmit={handleSubmit}>
      <TextField
        type="text"
        label="Username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={username}
        error={
          !signIn &&
          usernameSubmitted !== undefined &&
          (usernameSubmitted.length < 6 ||
            users.find((user) => user.name === usernameSubmitted))
        }
        helperText={
          !signIn &&
          usernameSubmitted !== undefined &&
          !!users.find((user) => user.name === usernameSubmitted)
            ? "Username already taken"
            : ""
        }
      />
      {!signIn &&
        usernameSubmitted !== undefined &&
        (usernameSubmitted.length > 5 &&
        !users.find((user) => user.name === usernameSubmitted) ? (
          <CheckIcon />
        ) : (
          <ClearIcon />
        ))}
      <TextField
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={password}
        error={
          passwordSubmitted !== undefined &&
          !passwordRegex.test(passwordSubmitted)
        }
      />

      <div onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </div>

      {!signIn && (
        <TextField
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          name="password-confirm"
          placeholder="Password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onKeyPress={(e) => handleInputSubmit(e)}
          value={passwordConfirm}
          error={
            passwordSubmitted !== undefined &&
            passwordConfirmSubmitted !== undefined &&
            passwordSubmitted !== passwordConfirmSubmitted
          }
          helperText={
            passwordSubmitted !== undefined &&
            passwordConfirmSubmitted !== undefined &&
            passwordSubmitted !== passwordConfirmSubmitted
              ? "Not same password"
              : ""
          }
        />
      )}
      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Submit
      </LoadingButton>
      <div onClick={() => setSignIn(!signIn)}>
        {signIn
          ? "Don't have an account yet ? Sign Up !"
          : "Already have an account ? Sign In !"}
      </div>
    </StyledSignIn>
  );
};

SignIn.propTypes = {
  isAuthentified: PropTypes.bool.isRequired,
};

export default SignIn;
