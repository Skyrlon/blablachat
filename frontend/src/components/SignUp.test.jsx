import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import "@testing-library/jest-dom";
import SignUp from "./SignUp";
import { createMemoryHistory } from "history";
import { BrowserRouter } from "react-router-dom";

const history = createMemoryHistory();

const MockSignUp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );
};

//Username input tests
it("renders username input", async () => {
  render(<MockSignUp />);
  const usernameInput = screen.getByLabelText("Username");
  expect(usernameInput).toBeInTheDocument();
});

it("should be able to type in username input", async () => {
  render(<MockSignUp />);
  const usernameInput = screen.getByLabelText("Username");
  fireEvent.change(usernameInput, { target: { value: "SimpleOne" } });
  expect(usernameInput.value).toBe("SimpleOne");
});

it("should shows username input as invalid if its length is inferior to 6", async () => {
  render(<MockSignUp />);
  const usernameInput = screen.getByLabelText("Username");
  fireEvent.change(usernameInput, { target: { value: "Simpl" } });
  fireEvent.submit(usernameInput);
  expect(usernameInput).not.toBeValid();
});

it("should shows username input as valid if its length is superior to 5", async () => {
  render(<MockSignUp />);
  const usernameInput = screen.getByLabelText("Username");
  fireEvent.change(usernameInput, { target: { value: "Simple" } });
  fireEvent.submit(usernameInput);
  expect(usernameInput).toBeValid();
});

//Password input tests
it("renders password input", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();
});

it("renders icon to show password", async () => {
  render(<MockSignUp />);
  const iconElement = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  expect(iconElement).toBeInTheDocument();
});

it("renders password input with password type", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute("type", "password");
});

it("should be able to type in password input", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Password1@" } });
  expect(passwordInput.value).toBe("Password1@");
});

it("should change password input type after clicking on visibilty button", () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  const visibiltyButton = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  fireEvent.click(visibiltyButton);
  expect(passwordInput).toHaveAttribute("type", "text");
});

it("should toggle back to orignal password input type", () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  const visibiltyButton = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  fireEvent.click(visibiltyButton);
  fireEvent.click(visibiltyButton);
  expect(passwordInput).toHaveAttribute("type", "password");
});

it("should show password input as invalid if its length is inferior to 8", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Passw1@" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).not.toBeValid();
});

it("should show password input as valid if its length is superior to 7", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Passwo1@" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).toBeValid();
});

it("should show password input as invalid if there is no caps", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "passwo1@" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).not.toBeValid();
});

it("should show password input as invalid if there is no lower case", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "PASSWO1@" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).not.toBeValid();
});

it("should show password input as invalid if there is no number", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Passwor@" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).not.toBeValid();
});

it("should show password input as invalid if there is no special character", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Passwor1" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).not.toBeValid();
});

it("should show password input as valid if all conditions are met", async () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Passwo1@" } });
  fireEvent.submit(passwordInput);
  expect(passwordInput).toBeValid();
});

//Confirm Password input tests
it("renders confirm password input", async () => {
  render(<MockSignUp />);
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  expect(confirmPasswordInput).toBeInTheDocument();
});

it("renders icon to show confirm password", async () => {
  render(<MockSignUp />);
  const iconElement = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  expect(iconElement).toBeInTheDocument();
});

it("renders confirm password input with password type", async () => {
  render(<MockSignUp />);
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  expect(confirmPasswordInput).toHaveAttribute("type", "password");
});

it("should be able to type in confirm password input", async () => {
  render(<MockSignUp />);
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  fireEvent.change(confirmPasswordInput, { target: { value: "Password1@" } });
  expect(confirmPasswordInput.value).toBe("Password1@");
});

it("should change confirm password input type after clicking on visibilty button", () => {
  render(<MockSignUp />);
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  const visibiltyButton = screen.getByRole("button", {
    name: "toggle confirm password visibility",
  });
  fireEvent.click(visibiltyButton);
  expect(confirmPasswordInput).toHaveAttribute("type", "text");
});

it("should toggle back to orignal confirm password input type", () => {
  render(<MockSignUp />);
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  const visibiltyButton = screen.getByRole("button", {
    name: "toggle confirm password visibility",
  });
  fireEvent.click(visibiltyButton);
  fireEvent.click(visibiltyButton);
  expect(confirmPasswordInput).toHaveAttribute("type", "password");
});

it("should show confirm password input as invalid if its value is not the same as the password input", () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  fireEvent.change(passwordInput, { target: { value: "Passwo1@" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Paswo1@" } });
  fireEvent.submit(confirmPasswordInput);
  expect(confirmPasswordInput).not.toBeValid();
});

it("should show confirm password input as valid if its value is the same as the password input", () => {
  render(<MockSignUp />);
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  fireEvent.change(passwordInput, { target: { value: "Passwo1@" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Passwo1@" } });
  fireEvent.submit(confirmPasswordInput);
  expect(confirmPasswordInput).toBeValid();
});

//Submit button tests
it("renders submit button", async () => {
  render(<MockSignUp />);
  const buttonElement = screen.getByRole("button", { name: "Sign up" });
  expect(buttonElement).toBeInTheDocument();
});
