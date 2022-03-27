import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import MembersSidebar from "./MembersSidebar";

const initialState = {
  currentUser: {
    id: 0,
    name: "TestUserOne",
    password: "Password1@",
    friendsID: [],
    friendsRequest: [],
  },
  currentChatroomId: 0,
  users: [
    {
      id: 0,
      name: "TestUserOne",
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
    {
      id: 2,
      name: "TestUserThree",
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

const MockMembersSidebar = ({ hasThreeMembers }) => {
  const chatroomWithThreeMembers = {
    id: 0,
    name: "TestChatroom",
    membersID: [0, 1, 2],
    ownerID: 0,
    messages: [],
  };

  function reducer(state = initialState, action) {
    return hasThreeMembers
      ? { ...state, chatrooms: [chatroomWithThreeMembers] }
      : state;
  }

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <MembersSidebar />
    </Provider>
  );
};

it("renders title", () => {
  render(<MockMembersSidebar />);
  const title = screen.getByText(/Members/i);
  expect(title).toBeInTheDocument();
});

it("should shows the number 2 if there are 2 members", () => {
  render(<MockMembersSidebar />);
  const title = screen.getByText(/Members/i);
  expect(title).toHaveTextContent(/2/i);
});

it("should shows the number 3 if there are 3 members", () => {
  render(<MockMembersSidebar hasThreeMembers={true} />);
  const title = screen.getByText(/Members/i);
  expect(title).toHaveTextContent(/3/i);
});

it("should show the first member name", () => {
  render(<MockMembersSidebar />);
  const userOne = screen.getByText(/TestUserOne/i);
  expect(userOne).toBeInTheDocument();
});

it("should show the second member name", () => {
  render(<MockMembersSidebar />);
  const userTwo = screen.getByText(/TestUserTwo/i);
  expect(userTwo).toBeInTheDocument();
});

it("should not show user who is not a member", () => {
  render(<MockMembersSidebar />);
  const userThree = screen.queryByText(/TestUserThree/i);
  expect(userThree).toBeNull();
});
