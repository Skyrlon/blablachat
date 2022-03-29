import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddFriendTab from "./AddFriendTab";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: 0,
    name: "TestUserOne",
    password: "Password1@",
    friendsID: [1],
    friendsRequest: [],
  },
  users: [
    {
      id: 0,
      name: "TestUserOne",
      password: "Password1@",
      friendsID: [1],
      friendsRequest: [],
    },
    {
      id: 1,
      name: "TestUserTwo",
      password: "Password1@",
      friendsID: [0],
      friendsRequest: [],
    },
    {
      id: 2,
      name: "TestUserThree",
      password: "Password1@",
      friendsID: [],
      friendsRequest: [],
    },
  ],
  chatrooms: [],
};

const MockAddFriendTab = ({ gotFriends }) => {
  function reducer(state = initialState, action) {
    return state;
  }

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <AddFriendTab />
    </Provider>
  );
};

it("renders input", () => {
  render(<MockAddFriendTab />);
  const input = screen.getByPlaceholderText("Search user");
  expect(input).toBeInTheDocument();
});

it("renders search button", () => {
  render(<MockAddFriendTab />);
  const button = screen.getByRole("button", { name: "Search" });
  expect(button).toBeInTheDocument();
});

it("should show user who is not friend with the current user", () => {
  render(<MockAddFriendTab />);
  const input = screen.getByPlaceholderText("Search user");
  fireEvent.change(input, { target: { value: "TestUser" } });
  const button = screen.getByRole("button", { name: "Search" });
  fireEvent.click(button);
  const user = screen.getByText(/TestUserThree/i);
  expect(user).toBeInTheDocument();
});

it("should not show current user name", () => {
  render(<MockAddFriendTab />);
  const input = screen.getByPlaceholderText("Search user");
  fireEvent.change(input, { target: { value: "TestUser" } });
  const button = screen.getByRole("button", { name: "Search" });
  fireEvent.click(button);
  const user = screen.queryByText(/TestUserOne/i);
  expect(user).toBeNull();
});

it("should not show current user friend name", () => {
  render(<MockAddFriendTab />);
  const input = screen.getByPlaceholderText("Search user");
  fireEvent.change(input, { target: { value: "TestUser" } });
  const button = screen.getByRole("button", { name: "Search" });
  fireEvent.click(button);
  const user = screen.queryByText(/TestUserTwo/i);
  expect(user).toBeNull();
});

it("should render 'send request' button", () => {
  render(<MockAddFriendTab />);
  const input = screen.getByPlaceholderText("Search user");
  fireEvent.change(input, { target: { value: "TestUser" } });
  const searchButton = screen.getByRole("button", { name: "Search" });
  fireEvent.click(searchButton);
  const sendButton = screen.getByRole("button", { name: "Send request" });
  expect(sendButton).toBeInTheDocument();
});
