import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FriendsRequestsTab from "./FriendsRequestsTab";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";

const userWithoutFriendsRequests = {
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
      friendsID: [],
      friendsRequest: [],
    },
  ],
  chatrooms: [],
};

const userWithFriendsRequests = {
  currentUser: {
    id: 0,
    name: "TestUser",
    password: "Password1@",
    friendsID: [],
    friendsRequest: [1, 2],
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
      name: "SenderOne",
      password: "Password1@",
      friendsID: [0],
      friendsRequest: [],
    },
    {
      id: 2,
      name: "SenderTwo",
      password: "Password1@",
      friendsID: [0],
      friendsRequest: [],
    },
  ],
  chatrooms: [],
};

const MockFriendsRequestsTab = ({ gotFriends }) => {
  function reducer(
    state = gotFriends ? userWithFriendsRequests : userWithoutFriendsRequests,
    action
  ) {
    return state;
  }

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <FriendsRequestsTab />
    </Provider>
  );
};

it("renders 'Requests' title", () => {
  render(<MockFriendsRequestsTab />);
  const title = screen.getByText(/Requests -/i);
  expect(title).toBeInTheDocument();
});

it("renders the number '0' in title when there are no friends", () => {
  render(<MockFriendsRequestsTab />);
  const title = screen.getByText(/Requests -/i);
  expect(title).toContainHTML("0");
});

it("renders 'No requests yet' text when there are no friends", () => {
  render(<MockFriendsRequestsTab />);
  const text = screen.getByText(/No requests yet/i);
  expect(text).toBeInTheDocument();
});

it("does not renders 'No requests yet' text when there are friends", () => {
  render(<MockFriendsRequestsTab gotFriends={true} />);
  const text = screen.queryByText(/No requests yet/i);
  expect(text).toBeNull();
});

it("renders the number of friends in title", () => {
  render(<MockFriendsRequestsTab gotFriends={true} />);
  const title = screen.getByText(/Requests -/i);
  expect(title).toContainHTML("2");
});

it("renders friends requests senders names", () => {
  render(<MockFriendsRequestsTab gotFriends={true} />);
  const firstSender = screen.getByText(/SenderOne/i);
  const secondSender = screen.getByText(/SenderTwo/i);
  expect(firstSender).toBeInTheDocument();
  expect(secondSender).toBeInTheDocument();
});

it("does not render 'Accept' button when there are no friends requests", () => {
  render(<MockFriendsRequestsTab />);
  const acceptButtons = screen.queryByRole("button", {
    name: "Accept",
  });
  expect(acceptButtons).toBeNull();
});

it("does not render 'Reject' button when there are no friends requests", () => {
  render(<MockFriendsRequestsTab />);
  const rejectButtons = screen.queryByRole("button", {
    name: "Reject",
  });
  expect(rejectButtons).toBeNull();
});

it("renders 'Accept' buttons for every friends requests", async () => {
  render(<MockFriendsRequestsTab gotFriends={true} />);
  const acceptButtons = await screen.findAllByRole("button", {
    name: "Accept",
  });
  expect(acceptButtons).toHaveLength(2);
});

it("renders 'Reject' buttons for every friends requests", async () => {
  render(<MockFriendsRequestsTab gotFriends={true} />);
  const rejectButtons = await screen.findAllByRole("button", {
    name: "Reject",
  });
  expect(rejectButtons).toHaveLength(2);
});
