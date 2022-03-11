import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { getUsers } from "../store/Selectors";

const StyledSignUp = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignUp = () => {
  const dispatch = useDispatch();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/gi;

  const users = useSelector(getUsers());

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
  };

  return (
    <StyledSignUp>
      <TextField
        type="text"
        label="Username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={username}
        error={
          usernameSubmitted !== undefined &&
          (usernameSubmitted.length < 6 ||
            users.find((user) => user.name === usernameSubmitted))
        }
        helperText={
          usernameSubmitted !== undefined &&
          !!users.find((user) => user.name === usernameSubmitted)
            ? "Username already taken"
            : ""
        }
      />
      {usernameSubmitted !== undefined &&
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

      {
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
      }
      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Submit
      </LoadingButton>
    </StyledSignUp>
  );
};

export default SignUp;
