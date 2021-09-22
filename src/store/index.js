import { createStore } from "redux";

const initialState = {
  users: [
    {
      id: 0,
      name: "SimpleOne",
      password: "Password1@",
      friendsID: [1, 2],
      friendsRequest: [3],
    },
    {
      id: 1,
      name: "Toto1337",
      password: "AVeryDifficultPassword1@",
      friendsID: [2],
      friendsRequest: [],
    },
    {
      id: 2,
      name: "HolderPlace85!",
      password: "Password11$",
      friendsID: [],
      friendsRequest: [],
    },
    {
      id: 3,
      name: "Human",
      password: "@!1Az1!@",
      friendsID: [0, 1],
      friendsRequest: [],
    },
  ],
  chatrooms: [
    {
      id: 0,
      name: "Discussion with friends",
      membersID: [0, 1, 3],
      messages: [
        {
          id: 0,
          writerID: 0,
          time: 1626874479000,
          text: "Message for test",
          modified: false,
          deleted: false,
        },
        {
          id: 1,
          writerID: 1,
          time: 1626875479000,
          text: "Test for message",
          modified: false,
          deleted: false,
        },
      ],
    },
    {
      id: 1,
      name: "Work room",
      membersID: [0, 2],
      messages: [
        {
          id: 0,
          writerID: 0,
          time: 1626774479000,
          text: "Time to work",
          modified: false,
          deleted: false,
        },
        {
          id: 1,
          writerID: 2,
          time: 1626775579000,
          text: "Yep",
          modified: false,
          deleted: false,
        },
      ],
    },
  ],
};

const MODIFY_MESSAGES = "MODIFY_MESSAGES";

const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

const EDIT_MESSAGE = "EDIT_MESSAGE";

const DELETE_MESSAGE = "DELETE_MESSAGE";

const CREATE_CHATROOM = "CREATE_CHATROOM";

const ADD_MEMBER = "ADD_MEMBER";

const LEAVE_CHATROOM = "LEAVE_CHATROOM";

const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";

const REJECT_FRIEND_REQUEST = "REJECT_FRIEND_REQUEST";

function reducer(state = initialState, action) {
  switch (action.type) {
    case MODIFY_MESSAGES:
      return {
        ...state,
        chatrooms: state.chatrooms.map((chatroom) => {
          if (chatroom.id === action.payload.chatroomId)
            return {
              ...chatroom,
              messages: action.payload.messages,
            };
          return chatroom;
        }),
      };
    case EDIT_MESSAGE:
      return {
        ...state,
        chatrooms: state.chatrooms.map((chatroom) => {
          if (chatroom.id === action.payload.chatroomId)
            return {
              ...chatroom,
              messages: chatroom.messages.map((message) => {
                if (message.id === action.payload.id)
                  return {
                    ...message,
                    text: action.payload.message,
                    edited: true,
                  };
                return message;
              }),
            };
          return chatroom;
        }),
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        chatrooms: state.chatrooms.map((chatroom) => {
          if (chatroom.id === action.payload.chatroomId)
            return {
              ...chatroom,
              messages: [
                ...chatroom.messages,
                {
                  id: chatroom.messages.length,
                  writerID: action.payload.writer,
                  time: action.payload.time,
                  text: action.payload.text,
                  modified: false,
                  deleted: false,
                },
              ],
            };
          return chatroom;
        }),
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        chatrooms: state.chatrooms.map((chatroom) => {
          if (chatroom.id === action.payload.chatroomId)
            return {
              ...chatroom,
              messages: chatroom.messages.map((message) => {
                if (message.id === action.payload.id)
                  return {
                    ...message,
                    text: "",
                    deleted: true,
                  };
                return message;
              }),
            };
          return chatroom;
        }),
      };
    case CREATE_CHATROOM:
      return {
        ...state,
        chatrooms: [
          ...state.chatrooms,
          {
            id: state.chatrooms.length,
            name: `Chatroom ${state.chatrooms.length}`,
            membersID: action.payload.members,
            messages: [],
          },
        ],
      };

    case ADD_MEMBER:
      return {
        ...state,
        chatrooms: state.chatrooms.map((chatroom) => {
          if (chatroom.id === action.payload.chatroomId)
            return {
              ...chatroom,
              membersID: [...chatroom.membersID, ...action.payload.newMember],
            };
          return chatroom;
        }),
      };

    case LEAVE_CHATROOM:
      return {
        ...state,
        chatrooms: state.chatrooms.map((chatroom) => {
          if (chatroom.id === action.payload.chatroomId)
            return {
              ...chatroom,
              membersID: chatroom.membersID.filter(
                (member) => member !== action.payload.userLeaving
              ),
            };
          return chatroom;
        }),
      };

    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.receiverId)
            return {
              ...user,
              friendsRequest: user.friendsRequest.filter(
                (request) => request !== action.payload.senderId
              ),
              friendsID: [...user.friendsID, action.payload.senderId],
            };
          if (user.id === action.payload.senderId)
            return {
              ...user,
              friendsID: [...user.friendsID, action.payload.receiverId],
            };
          return user;
        }),
      };

    case REJECT_FRIEND_REQUEST:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.receiverId)
            return {
              ...user,
              friendsRequest: user.friendsRequest.filter(
                (request) => request !== action.payload.senderId
              ),
            };
          return user;
        }),
      };

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
