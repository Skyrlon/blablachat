import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddMember from "./AddMember";
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
  chatrooms: [
    {
      id: 0,
      name: "TestChatroom",
      membersID: [0, 1],
      ownerID: 0,
      messages: [],
    },
  ],
};

const userWithoutFriend = {
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
    {
      id: 1,
      name: "TestUserTwo",
      password: "Password1@",
      friendsID: [],
      friendsRequest: [],
    },
  ],
  chatrooms: [
    {
      id: 0,
      name: "TestChatroom",
      membersID: [0, 1],
      ownerID: 0,
      messages: [],
    },
  ],
};

const MockAddMember = ({ gotFriends }) => {
  const initialState = gotFriends ? userWithFriend : userWithoutFriend;
  function reducer(state = initialState, action) {
    return state;
  }

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <AddMember currentChatroomId={0} />
    </Provider>
  );
};

it("renders add icon", () => {
  render(<MockAddMember gotFriends={false} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  expect(addIcon).toBeInTheDocument();
});

it("should show SelectFriendsDropDown menu after clicking on add icon", () => {
  render(<MockAddMember gotFriends={false} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const dropdown = screen.getByTestId("select-friends-dropdown");
  expect(dropdown).toBeInTheDocument();
});

it("does not render checkbox if there is no friends", () => {
  render(<MockAddMember gotFriends={false} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const checkbox = screen.queryByRole("checkbox");
  expect(checkbox).toBeNull();
});

it("renders checkbox if there are friends", () => {
  render(<MockAddMember gotFriends={true} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const checkbox = screen.queryAllByRole("checkbox");
  expect(checkbox).toHaveLength(1);
});

it("does not render friend name who is already a member", () => {
  render(<MockAddMember gotFriends={true} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const firstFriendName = screen.queryByText("FriendOne");
  expect(firstFriendName).toBeNull();
});

it("renders friend name who is not a member", () => {
  render(<MockAddMember gotFriends={true} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const secondFriendName = screen.getByText("FriendTwo");
  expect(secondFriendName).toBeInTheDocument();
});

it("should enable 'Add Member(s)' button when alteast one friend is checked", () => {
  render(<MockAddMember gotFriends={true} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const secondFriendName = screen.getByText("FriendTwo");
  fireEvent.click(secondFriendName);
  const button = screen.getByRole("button", {
    name: "Add Member(s)",
  });
  expect(button).toBeEnabled();
});

it("should close SelectFriendsDropDown menu after submitting friends selected", () => {
  render(<MockAddMember gotFriends={true} />);
  const addIcon = screen.getByTestId("PersonAddIcon");
  fireEvent.click(addIcon);
  const secondFriendName = screen.getByText("FriendTwo");
  fireEvent.click(secondFriendName);
  const dropdown = screen.getByTestId("select-friends-dropdown");
  const button = screen.getByRole("button", {
    name: "Add Member(s)",
  });
  fireEvent.click(button);
  expect(dropdown).not.toBeInTheDocument();
});
