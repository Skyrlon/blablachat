import { useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

const StyledSignIn = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const SignIn = ({ users }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      } else {
        setIsSubmitCorrect(undefined);
        alert("Account Created");
      }
    } else {
      if (
        users.some(
          (user) => user.name === username && user.password === password
        )
      ) {
        const userLogged = users.filter(
          (user) => user.name === username && user.password === password
        )[0];
        alert(`Welcome Back ${userLogged.name}`);
      } else {
        alert("No account found");
      }
    }
  };

  return (
    <StyledSignIn onSubmit={handleSubmit}>
      <label htmlFor="username">User name : </label>
      <input
        type="text"
        name="username"
        placeholder="User name"
        onChange={handleOnChangeUserName}
        value={username}
      />
      {!signIn && isSubmitCorrect === false && isUsernameTaken && (
        <div>Username already taken</div>
      )}
      {!signIn &&
        isSubmitCorrect === false &&
        (isUsernameLengthCorrect && !isUsernameTaken ? (
          <CheckIcon />
        ) : (
          <ClearIcon />
        ))}
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
          <label htmlFor="password-confirm">Confirm your password : </label>
          <input
            type="password"
            name="password-confirm"
            placeholder="Password"
            onChange={handleOnChangePasswordConfirm}
            value={passwordConfirm}
          />
          {isSubmitCorrect === false &&
            (isPasswordConfirmSame ? <CheckIcon /> : <ClearIcon />)}
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