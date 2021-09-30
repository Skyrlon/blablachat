import { createStore } from "redux";
import produce from "immer";

const initialState = {
  users: [
    {
      id: 0,
      name: "SimpleOne",
      password: "Password1@",
      friendsID: [1],
      friendsRequest: [3],
    },
    {
      id: 1,
      name: "Toto1337",
      password: "AVeryDifficultPassword1@",
      friendsID: [0, 3],
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
      friendsID: [1],
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

const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

const EDIT_MESSAGE = "EDIT_MESSAGE";

const DELETE_MESSAGE = "DELETE_MESSAGE";

const CREATE_CHATROOM = "CREATE_CHATROOM";

const ADD_MEMBER = "ADD_MEMBER";

const LEAVE_CHATROOM = "LEAVE_CHATROOM";

const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";

const REJECT_FRIEND_REQUEST = "REJECT_FRIEND_REQUEST";

const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";

const REMOVE_FRIEND = "REMOVE_FRIEND";

function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_MESSAGE:
      return produce(state, (draft) => {
        const messageToEdit = draft.chatrooms
          .find((chatroom) => chatroom.id === action.payload.chatroomId)
          .messages.find((message) => message.id === action.payload.id);
        messageToEdit.text = action.payload.message;
        messageToEdit.modified = true;
      });

    case ADD_NEW_MESSAGE:
      return produce(state, (draft) => {
        const messages = draft.chatrooms.find(
          (chatroom) => chatroom.id === action.payload.chatroomId
        ).messages;
        messages.push({
          id: messages.length,
          writerID: action.payload.writer,
          time: action.payload.time,
          text: action.payload.text,
          modified: false,
          deleted: false,
        });
      });

    case DELETE_MESSAGE:
      return produce(state, (draft) => {
        const messageToDelete = draft.chatrooms
          .find((chatroom) => chatroom.id === action.payload.chatroomId)
          .messages.find((message) => message.id === action.payload.id);
        messageToDelete.text = "";
        messageToDelete.deleted = true;
      });

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

    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.receiverId)
            return {
              ...user,
              friendsRequest: [...user.friendsRequest, action.payload.senderId],
            };
          return user;
        }),
      };

    case REMOVE_FRIEND:
      return {
        ...state,
        users: state.users.map((user) => {
          if (action.payload.formerFriends.includes(user.id))
            return {
              ...user,
              friendsID: user.friendsID.filter(
                (friend) =>
                  friend !==
                  action.payload.formerFriends.find((x) => x !== user.id)
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
