import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const axios = require("axios");

const StyledSignIn = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const SignIn = ({ users, addUser, onSuccessfulSignIn, isAuthentified }) => {
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const [isSubmitCorrect, setIsSubmitCorrect] = useState(undefined);

  const [isUsernameLengthCorrect, setIsUsernameLengthCorrect] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(undefined);

  const [isPasswordMinChar, setIsPasswordMinChar] = useState(false);
  const [isPasswordUppercase, setIsPasswordUppercase] = useState(false);
  const [isPasswordLowercase, setIsPasswordLowercase] = useState(false);
  const [isPasswordNumber, setIsPasswordNumber] = useState(false);
  const [isPasswordSpecial, setIsPasswordSpecial] = useState(false);

  const [isPasswordConfirmSame, setIsPasswordConfirmSame] = useState(undefined);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeUserName = (e) => {
    if (!signIn) {
      const usernameChars = e.target.value.split("");
      usernameChars.length > 5 && usernameChars.length < 31
        ? setIsUsernameLengthCorrect(true)
        : setIsUsernameLengthCorrect(false);
    }
    setUsername(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    if (!signIn) {
      const passwordChars = e.target.value.split("");
      passwordChars.length > 7
        ? setIsPasswordMinChar(true)
        : setIsPasswordMinChar(false);
      passwordChars.some(
        (element) => isNaN(element) && element === element.toUpperCase()
      )
        ? setIsPasswordUppercase(true)
        : setIsPasswordUppercase(false);
      passwordChars.some(
        (element) => isNaN(element) && element === element.toLowerCase()
      )
        ? setIsPasswordLowercase(true)
        : setIsPasswordLowercase(false);
      passwordChars.some((element) => !isNaN(element) && element !== " ")
        ? setIsPasswordNumber(true)
        : setIsPasswordNumber(false);
      passwordChars.some((element) =>
        ` !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`.split("").includes(element)
      )
        ? setIsPasswordSpecial(true)
        : setIsPasswordSpecial(false);
    }
    setPassword(e.target.value);
  };

  const handleOnChangePasswordConfirm = (e) => {
    e.target.value === password
      ? setIsPasswordConfirmSame(true)
      : setIsPasswordConfirmSame(false);
    setpasswordConfirm(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!signIn) {
      if (
        [
          isUsernameLengthCorrect,
          isPasswordMinChar,
          isPasswordUppercase,
          isPasswordLowercase,
          isPasswordNumber,
          isPasswordSpecial,
          isPasswordConfirmSame,
        ].some((element) => element === false) ||
        users.some((user) => user.name === username)
      ) {
        users.some((user) => user.name === username)
          ? setIsUsernameTaken(true)
          : setIsUsernameTaken(false);
        setIsSubmitCorrect(false);
        setIsLoading(false);
      } else {
        setIsSubmitCorrect(undefined);
        addUser({ name: username, password: password });
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
            onSuccessfulSignIn(response.data[0].id);
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
        onChange={handleOnChangeUserName}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={username}
        error={!signIn && isSubmitCorrect === false && isUsernameTaken}
        helperText={
          !signIn && isSubmitCorrect === false && isUsernameTaken
            ? "Username already taken"
            : ""
        }
      />
      {!signIn &&
        isSubmitCorrect === false &&
        (isUsernameLengthCorrect && !isUsernameTaken ? (
          <CheckIcon />
        ) : (
          <ClearIcon />
        ))}
      <TextField
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Password"
        onChange={handleOnChangePassword}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={password}
        error={
          isSubmitCorrect === false &&
          !(
            isPasswordMinChar &&
            isPasswordUppercase &&
            isPasswordLowercase &&
            isPasswordNumber &&
            isPasswordSpecial
          )
        }
      />

      <div onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </div>

      {!signIn && (
        <>
          <ul>
            Password must have atleast:
            <li>
              {isPasswordMinChar ? <CheckIcon /> : <ClearIcon />} 8 characters
              minimum
            </li>
            <li>
              {isPasswordUppercase ? <CheckIcon /> : <ClearIcon />} 1 uppercase
              letter
            </li>
            <li>
              {isPasswordLowercase ? <CheckIcon /> : <ClearIcon />} 1 lowercase
              letter
            </li>
            <li>{isPasswordNumber ? <CheckIcon /> : <ClearIcon />} 1 number</li>
            <li>
              {isPasswordSpecial ? <CheckIcon /> : <ClearIcon />} 1 special
              character
            </li>
          </ul>
          <TextField
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            name="password-confirm"
            placeholder="Password"
            onChange={handleOnChangePasswordConfirm}
            onKeyPress={(e) => handleInputSubmit(e)}
            value={passwordConfirm}
            error={isSubmitCorrect === false && !isPasswordConfirmSame}
            helperText={
              isSubmitCorrect === false && !isPasswordConfirmSame
                ? "Not same password"
                : ""
            }
          />
        </>
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
  users: PropTypes.array,
  addUser: PropTypes.func,
  onSuccessfulSignIn: PropTypes.func,
};

export default SignIn;
