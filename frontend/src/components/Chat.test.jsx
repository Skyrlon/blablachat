import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import Chat from "./Chat";

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
  ],
  chatrooms: [
    {
      id: 0,
      name: "TestChatroom",
      membersID: [0, 1],
      ownerID: 0,
      messages: [
        {
          id: 0,
          writerID: 0,
          time: new Date(),
          text: "Message for test",
          modified: false,
          deleted: false,
        },
      ],
    },
  ],
};

const MockChat = ({ messageDate }) => {
  function messageTime() {
    if (messageDate === "yesterday") {
      return new Date().setDate(new Date().getDate() - 1);
    } else if (messageDate === "twoDaysAgo") {
      return new Date().setDate(new Date().getDate() - 2);
    } else {
      return new Date();
    }
  }
  const messages = [
    {
      id: 0,
      writerID: 0,
      time: messageTime(),
      text: "Message for test",
      modified: false,
      deleted: false,
    },
  ];

  const chatroom = [
    {
      id: 0,
      name: "TestChatroom",
      membersID: [0, 1],
      ownerID: 0,
      messages: [...messages],
    },
  ];

  const initialStateModified = {
    ...initialState,
    chatrooms: [...chatroom],
  };

  function reducer(state = initialStateModified, action) {
    return state;
  }

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
};

it("renders chatroom name", () => {
  render(<MockChat />);
  const chatroomName = screen.getByText(/TestChatroom/i);
  expect(chatroomName).toBeInTheDocument();
});

it("renders message writer name", () => {
  render(<MockChat />);
  const writerName = screen.getByText(/TestUserOne/i);
  expect(writerName).toBeInTheDocument();
});

it("renders message text", () => {
  render(<MockChat />);
  const writerName = screen.getByText(/Message for test/i);
  expect(writerName).toBeInTheDocument();
});

it("renders message date as 'today' if it was written in same day", () => {
  render(<MockChat />);
  const messageDate = screen.getByText(/Today/i);
  expect(messageDate).toBeInTheDocument();
});

it("renders message date as 'yesterday' if it was written the day before", () => {
  render(<MockChat messageDate={"yesterday"} />);
  const messageDate = screen.getByText(/Yesterday/i);
  expect(messageDate).toBeInTheDocument();
});

it("renders message date in dd/mm/yy format if it was atleast written 2 days ago", () => {
  render(<MockChat messageDate={"twoDaysAgo"} />);
  const date = new Date();
  date.setDate(date.getDate() - 2);
  function formatNumber(n) {
    return n < 10 ? "0" + n : n;
  }
  const formatedDate = `${formatNumber(date.getDate())}/${formatNumber(
    date.getMonth() + 1
  )}/${formatNumber(date.getFullYear())}`;
  const messageDate = screen.getByText(new RegExp(formatedDate, "i"));
  expect(messageDate).toBeInTheDocument();
});

it("renders message time", () => {
  render(<MockChat />);
  const date = new Date(Date.now());
  function formatNumber(n) {
    return n < 10 ? "0" + n : n;
  }
  const formatedTime = `${formatNumber(date.getHours())}:${formatNumber(
    date.getMinutes()
  )}`;
  const messageTime = screen.getByText(new RegExp(formatedTime, "i"));
  expect(messageTime).toBeInTheDocument();
});

it("renders edit button", () => {
  render(<MockChat />);
  const editButton = screen.getByTestId("EditIcon");
  expect(editButton).toBeInTheDocument();
});

it("renders delete button", () => {
  render(<MockChat />);
  const deleteButton = screen.getByTestId("DeleteIcon");
  expect(deleteButton).toBeInTheDocument();
});

it("renders edit input message after clicked on edit button", () => {
  render(<MockChat />);
  const editButton = screen.getByTestId("EditIcon");
  fireEvent.click(editButton);
  const editInput = screen.getByDisplayValue(/Message for test/i);
  expect(editInput).toBeInTheDocument();
});
