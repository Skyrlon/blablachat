import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AllFriendsTab from "./AllFriendsTab";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";

const userWithNoFriends = {
  currentUser: {
    id: 0,
    name: "TestUser",
    password: "Password1@",
    friendsID: [],
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
  ],
  chatrooms: [],
};

const userWithFriends = {
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

const MockAllFriendsTab = ({ gotFriends }) => {
  function reducer(
    state = gotFriends ? userWithFriends : userWithNoFriends,
    action
  ) {
    return state;
  }

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <AllFriendsTab />
    </Provider>
  );
};

it("renders title 'All Friends'", () => {
  render(<MockAllFriendsTab />);
  const title = screen.getByText(/All Friends/i);
  expect(title).toBeInTheDocument();
});

it("renders the number '0' in title when there are no friends", () => {
  render(<MockAllFriendsTab />);
  const title = screen.getByText(/All Friends/i);
  expect(title).toContainHTML("0");
});

it("renders 'You have no friends yet' text when there are no friends", () => {
  render(<MockAllFriendsTab />);
  const text = screen.getByText(/You have no friends yet/i);
  expect(text).toBeInTheDocument();
});

it("does not renders 'You have no friends yet' text when there are friends", () => {
  render(<MockAllFriendsTab gotFriends={true} />);
  const text = screen.queryByText(/You have no friends yet/i);
  expect(text).toBeNull();
});

it("renders the number of friends in title", () => {
  render(<MockAllFriendsTab gotFriends={true} />);
  const title = screen.getByText(/All Friends/i);
  expect(title).toContainHTML("2");
});

it("renders friends names", () => {
  render(<MockAllFriendsTab gotFriends={true} />);
  const firstFriend = screen.getByText(/FriendOne/i);
  const secondFriend = screen.getByText(/FriendTwo/i);
  expect(firstFriend).toBeInTheDocument();
  expect(secondFriend).toBeInTheDocument();
});
