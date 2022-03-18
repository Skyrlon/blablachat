import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import "@testing-library/jest-dom";
import LogIn from "./LogIn";

const MockLogIn = () => {
  return (
    <Provider store={store}>
      <LogIn />
    </Provider>
  );
};

it("renders username input", async () => {
  render(<MockLogIn />);
  const usernameInput = screen.getByLabelText("Username");
  expect(usernameInput).toBeInTheDocument();
});

it("renders password input", async () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();
});

it("renders icon to show password", async () => {
  render(<MockLogIn />);
  const iconElement = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  expect(iconElement).toBeInTheDocument();
});

it("renders submit button", async () => {
  render(<MockLogIn />);
  const buttonElement = screen.getByRole("button", { name: "Log in" });
  expect(buttonElement).toBeInTheDocument();
});

it("should be able to type in username input", async () => {
  render(<MockLogIn />);
  const usernameInput = screen.getByLabelText("Username");
  fireEvent.change(usernameInput, { target: { value: "SimpleOne" } });
  expect(usernameInput.value).toBe("SimpleOne");
});

it("should be able to type in password input", async () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Password1@" } });
  expect(passwordInput.value).toBe("Password1@");
});

it("renders password input with password type", async () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute("type", "password");
});

it("should change password input type after clicking on visibilty button", () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  const visibiltyButton = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  fireEvent.click(visibiltyButton);
  expect(passwordInput).toHaveAttribute("type", "text");
});

it("should toggle back to orignal password input type", () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  const visibiltyButton = screen.getByRole("button", {
    name: "toggle password visibility",
  });
  fireEvent.click(visibiltyButton);
  fireEvent.click(visibiltyButton);
  expect(passwordInput).toHaveAttribute("type", "password");
});

it("should show loading button when submit username", async () => {
  render(<MockLogIn />);
  const usernameInput = screen.getByLabelText("Username");
  fireEvent.submit(usernameInput);
  const loader = screen.getByRole("progressbar");
  expect(loader).toBeInTheDocument();
});

it("should show loading button when submit password", async () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.submit(passwordInput);
  const loader = screen.getByRole("progressbar");
  expect(loader).toBeInTheDocument();
});

it("should show loading button when click on submit button", async () => {
  render(<MockLogIn />);
  const buttonElement = screen.getByRole("button", { name: "Log in" });
  fireEvent.submit(buttonElement);
  const loader = screen.getByRole("progressbar");
  expect(loader).toBeInTheDocument();
});

it("should disable submit button when submit username", () => {
  render(<MockLogIn />);
  const usernameInput = screen.getByLabelText("Username");
  const buttonElement = screen.getByRole("button", { name: "Log in" });
  fireEvent.submit(usernameInput);
  expect(buttonElement).toBeDisabled();
});

it("should disable submit button when submit password", () => {
  render(<MockLogIn />);
  const passwordInput = screen.getByLabelText("Password");
  const buttonElement = screen.getByRole("button", { name: "Log in" });
  fireEvent.submit(passwordInput);
  expect(buttonElement).toBeDisabled();
});

it("should disable submit button when clicked on", () => {
  render(<MockLogIn />);
  const buttonElement = screen.getByRole("button", { name: "Log in" });
  fireEvent.click(buttonElement);
  expect(buttonElement).toBeDisabled();
});
