import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddChatRoom from "./AddChatRoom";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";

const userWithFriend = {
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

const userWithoutFriend = {
  currentUser: {
    id: 0,
    name: "TestUser",
    password: "Password1@",
    friendsID: [],
    friendsRequest: [],
  },
  users: [],
};

const MockAddChatRoom = ({ gotFriends }) => {
  const initialState = gotFriends ? userWithFriend : userWithoutFriend;
  function reducer(state = initialState, action) {
    return state;
  }

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <AddChatRoom />
    </Provider>
  );
};

it("renders add icon", () => {
  render(<MockAddChatRoom gotFriends={false} />);
  const addIcon = screen.getByTestId("AddIcon");
  expect(addIcon).toBeInTheDocument();
});

it("should show SelectFriendsDropDown menu after clicking on add icon", () => {
  render(<MockAddChatRoom gotFriends={false} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const dropdown = screen.getByTestId("select-friends-dropdown");
  expect(dropdown).toBeInTheDocument();
});

it("does not render checkbox if there is no friends", () => {
  render(<MockAddChatRoom gotFriends={false} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const checkbox = screen.queryByRole("checkbox");
  expect(checkbox).toBeNull();
});

it("renders checkbox if there are friends", () => {
  render(<MockAddChatRoom gotFriends={true} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const checkbox = screen.queryAllByRole("checkbox");
  expect(checkbox).toHaveLength(2);
});

it("renders first friend name", () => {
  render(<MockAddChatRoom gotFriends={true} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const firstFriendName = screen.getByText("FriendOne");
  expect(firstFriendName).toBeInTheDocument();
});

it("renders second friend name", () => {
  render(<MockAddChatRoom gotFriends={true} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const secondFriendName = screen.getByText("FriendTwo");
  expect(secondFriendName).toBeInTheDocument();
});

it("should enable 'create chatroom' button when alteast one friend is checked", () => {
  render(<MockAddChatRoom gotFriends={true} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const firstFriendName = screen.getByText("FriendOne");
  fireEvent.click(firstFriendName);
  const button = screen.getByRole("button", {
    name: "Create Chatroom",
  });
  expect(button).toBeEnabled();
});

it("should still enable 'create chatroom' button when two friends are checked", () => {
  render(<MockAddChatRoom gotFriends={true} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const firstFriendName = screen.getByText("FriendOne");
  const secondFriendName = screen.getByText("FriendTwo");
  fireEvent.click(firstFriendName);
  fireEvent.click(secondFriendName);
  const button = screen.getByRole("button", {
    name: "Create Chatroom",
  });
  expect(button).toBeEnabled();
});

it("sould close SelectFriendsDropDown menu after submitting friends selected", () => {
  render(<MockAddChatRoom gotFriends={true} />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const dropdown = screen.getByTestId("select-friends-dropdown");
  const firstFriendName = screen.getByText("FriendOne");
  const button = screen.getByRole("button", {
    name: "Create Chatroom",
  });
  fireEvent.click(firstFriendName);
  fireEvent.click(button);
  expect(dropdown).not.toBeInTheDocument();
});
