import { useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

const StyledSignIn = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const SignIn = () => {
  const [signIn, setSignIn] = useState(true);

  const [password, setPassword] = useState("");

  const [isPasswordMinChar, setIsPasswordMinChar] = useState(false);
  const [isPasswordUppercase, setIsPasswordUppercase] = useState(false);
  const [isPasswordLowercase, setIsPasswordLowercase] = useState(false);
  const [isPasswordNumber, setIsPasswordNumber] = useState(false);
  const [isPasswordSpecial, setIsPasswordSpecial] = useState(false);

  const handleOnChangePassword = (e) => {
    if (!signIn) {
      let passwordChars = e.target.value.split("");
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

  return (
    <StyledSignIn>
      <label htmlFor="username">User name : </label>
      <input type="text" name="username" placeholder="User name" />
      <label htmlFor="password">Password : </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleOnChangePassword}
        value={password}
      />

      {!signIn && (
        <>
          <label htmlFor="password-confirm">Confirm your password : </label>
          <input
            type="password"
            name="password-confirm"
            placeholder="Password"
          />
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
