import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";
import { getUsers } from "../store/Selectors";
const StyledSignUp = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SignUp = () => {
  const dispatch = useDispatch();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/g;

  const users = useSelector(getUsers());

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [usernameSubmitted, setUsernameSubmitted] = useState(undefined);
  const [passwordSubmitted, setPasswordSubmitted] = useState(undefined);
  const [passwordConfirmSubmitted, setPasswordConfirmSubmitted] =
    useState(undefined);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      username.length > 5 &&
      !users.find((user) => user.name === username) &&
      passwordRegex.test(password) &&
      password === passwordConfirm
    ) {
      dispatch({
        type: "CREATE_NEW_USER",
        payload: { name: username, password: password },
      });
      setIsLoading(false);
      alert("Account Created");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <StyledSignUp component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        margin="normal"
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

      <TextField
        margin="normal"
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {
        <TextField
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      }
      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Sign up
      </LoadingButton>
    </StyledSignUp>
  );
};

export default SignUp;
