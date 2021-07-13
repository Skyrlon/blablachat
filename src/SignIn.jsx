import { useState } from "react";
import styled from "styled-components";

const StyledSignIn = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const SignIn = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <StyledSignIn>
      <label htmlFor="pseudo">Pseudo : </label>
      <input type="text" name="pseudo" placeholder="Pseudo" />
      <label htmlFor="password">Password : </label>
      <input type="password" name="password" placeholder="Password" />

      {!signIn && (
        <>
          <label htmlFor="password-confirm">Confirm your password : </label>
          <input
            type="password"
            name="password-confirm"
            placeholder="Password"
          />
        </>
      )}
      <input type="submit" />
      <div onClick={() => setSignIn(!signIn)}>
        {signIn
          ? "Don't have an account yet ? Sign Up !"
          : "Already have an account ? Sign In !"}
      </div>
    </StyledSignIn>
  );
};

export default SignIn;
