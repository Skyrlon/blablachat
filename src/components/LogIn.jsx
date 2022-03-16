import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";

const axios = require("axios");

const StyledLogIn = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const LogIn = ({ children }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
  };

  return (
    <StyledLogIn component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        type="text"
        label="Username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={username}
      />
      <TextField
        margin="normal"
        fullWidth
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => handleInputSubmit(e)}
        value={password}
      />

      <div onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </div>

      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
      >
        Submit
      </LoadingButton>
      {children}
    </StyledLogIn>
  );
};

export default LogIn;
