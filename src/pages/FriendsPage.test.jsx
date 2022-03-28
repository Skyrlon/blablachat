import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FriendsPage from "./FriendsPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: 0,
    name: "TestUser",
    password: "Password1@",
    friendsID: [1, 2],
    friendsRequest: [],
  },
  users: [
    {
      id: 0,
      name: "TestUser",
      password: "Password1@",
      friendsID: [1],
      friendsRequest: [],
    },
    {
      id: 1,
      name: "FriendOne",
      password: "Password1@",
      friendsID: [0],
      friendsRequest: [],
    },
    {
      id: 2,
      name: "FriendTwo",
      password: "Password1@",
      friendsID: [0],
      friendsRequest: [],
    },
  ],
  chatrooms: [],
};

const MockFriendsPage = () => {
  function reducer(state = initialState, action) {
    return state;
  }

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FriendsPage />
      </BrowserRouter>
    </Provider>
  );
};

it("renders 'All' tab", () => {
  render(<MockFriendsPage />);
  const allTab = screen.getByRole("tab", { name: /All/i });
  expect(allTab).toBeInTheDocument();
});

it("renders 'Requests' tab", () => {
  render(<MockFriendsPage />);
  const requestsTab = screen.getByRole("tab", { name: /Requests/i });
  expect(requestsTab).toBeInTheDocument();
});

it("renders 'Add Friend' tab", () => {
  render(<MockFriendsPage />);
  const addFriendTab = screen.getByRole("tab", { name: /Add Friend/i });
  expect(addFriendTab).toBeInTheDocument();
});

it("'All' tab is selected by default but not the others", () => {
  render(<MockFriendsPage />);
  const allTab = screen.getByRole("tab", { name: /All/i });
  const requestsTab = screen.getByRole("tab", { name: /Requests/i });
  const addFriendTab = screen.getByRole("tab", { name: /Add Friend/i });
  expect(allTab).toHaveAttribute("aria-selected", "true");
  expect(requestsTab).toHaveAttribute("aria-selected", "false");
  expect(addFriendTab).toHaveAttribute("aria-selected", "false");
});

it("should only select 'Requests' tab after clicked on", () => {
  render(<MockFriendsPage />);
  const allTab = screen.getByRole("tab", { name: /All/i });
  const requestsTab = screen.getByRole("tab", { name: /Requests/i });
  const addFriendTab = screen.getByRole("tab", { name: /Add Friend/i });
  fireEvent.click(requestsTab);
  expect(allTab).toHaveAttribute("aria-selected", "false");
  expect(requestsTab).toHaveAttribute("aria-selected", "true");
  expect(addFriendTab).toHaveAttribute("aria-selected", "false");
});

it("should only select 'Add Friend' tab after clicked on", () => {
  render(<MockFriendsPage />);
  const allTab = screen.getByRole("tab", { name: /All/i });
  const requestsTab = screen.getByRole("tab", { name: /Requests/i });
  const addFriendTab = screen.getByRole("tab", { name: /Add Friend/i });
  fireEvent.click(addFriendTab);
  expect(allTab).toHaveAttribute("aria-selected", "false");
  expect(requestsTab).toHaveAttribute("aria-selected", "false");
  expect(addFriendTab).toHaveAttribute("aria-selected", "true");
});

it("should only select back 'All' tab after clicked on", () => {
  render(<MockFriendsPage />);
  const allTab = screen.getByRole("tab", { name: /All/i });
  const requestsTab = screen.getByRole("tab", { name: /Requests/i });
  const addFriendTab = screen.getByRole("tab", { name: /Add Friend/i });
  fireEvent.click(addFriendTab);
  fireEvent.click(allTab);
  expect(allTab).toHaveAttribute("aria-selected", "true");
  expect(requestsTab).toHaveAttribute("aria-selected", "false");
  expect(addFriendTab).toHaveAttribute("aria-selected", "false");
});
