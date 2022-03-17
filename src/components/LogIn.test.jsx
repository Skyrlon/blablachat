import { render, screen } from "@testing-library/react";
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
