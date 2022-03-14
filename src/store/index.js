import { createStore } from "redux";
import produce from "immer";

const initialState = {
  currentUser: {
    id: undefined,
    name: undefined,
    password: undefined,
    friendsID: undefined,
    friendsRequest: undefined,
  },

  currentChatroomId: null,

  isAuthentified: false,

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
      ownerID: 0,
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
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 2,
          writerID: 3,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 3,
          writerID: 0,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 4,
          writerID: 1,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 5,
          writerID: 3,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 6,
          writerID: 0,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 7,
          writerID: 1,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
        {
          id: 8,
          writerID: 3,
          time: 1626875479000,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor faucibus nisi a blandit. Etiam a porttitor dolor. Vivamus eu risus tristique erat vulputate aliquet. Maecenas pretium lacus quis vehicula porta. Nunc varius varius urna consequat viverra. Nunc condimentum bibendum purus quis vulputate. Aliquam hendrerit sagittis tempor. Nulla fringilla dictum purus, non pharetra neque congue eget. Sed sit amet nulla dui. Proin libero risus, elementum vitae tristique at, condimentum quis dolor. Vivamus viverra libero sit amet lectus accumsan, quis pulvinar risus luctus. Integer vestibulum sagittis magna, eget tincidunt dui mattis congue. Nullam blandit ullamcorper mi a faucibus. Aenean purus nisi, pharetra eu nulla a, facilisis pharetra elit. Nunc sit amet magna porttitor, vehicula ipsum at, pretium metus. Donec aliquet fermentum quam at consectetur. Donec ultrices, elit aliquam semper scelerisque, velit arcu gravida urna, vel facilisis dui tortor id tellus. Vivamus dignissim luctus nisl quis consequat. Morbi consectetur placerat dolor, tristique mollis lacus dignissim in. Integer dapibus felis a dolor cursus, id facilisis tortor scelerisque. Mauris feugiat, risus in tempus blandit, sem ipsum semper ante, eu mollis elit est ut justo. Sed eget enim magna. Phasellus semper mauris sit amet justo imperdiet, sit amet mollis odio blandit.",
          modified: false,
          deleted: false,
        },
      ],
    },
    {
      id: 1,
      name: "Work room",
      membersID: [0, 2],
      ownerID: 2,
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

const CREATE_NEW_USER = "CREATE_NEW_USER";

const LOAD_USER = "LOAD_USER";

const LOG_OUT = "LOG_OUT";

const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

const EDIT_MESSAGE = "EDIT_MESSAGE";

const DELETE_MESSAGE = "DELETE_MESSAGE";

const CREATE_CHATROOM = "CREATE_CHATROOM";

const ADD_MEMBER = "ADD_MEMBER";

const CHANGE_CURRENT_CHATROOM = "CHANGE_CURRENT_CHATROOM";

const LEAVE_CURRENT_CHATROOM = "LEAVE_CURRENT_CHATROOM";

const LEAVE_CHATROOM = "LEAVE_CHATROOM";

const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";

const REJECT_FRIEND_REQUEST = "REJECT_FRIEND_REQUEST";

const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";

const REMOVE_FRIEND = "REMOVE_FRIEND";

const SWITCH_CHATROOM_OWNER = "SWITCH_CHATROOM_OWNER";

const RENAME_CHATROOM = "RENAME_CHATROOM";

const EJECT_MEMBER = "EJECT_MEMBER";

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_USER:
      return produce(state, (draft) => {
        const newUser = {
          id: state.users.length,
          name: action.payload.name,
          password: action.payload.password,
          friendsID: [],
          friendsRequest: [],
        };
        draft.users.push(newUser);
        draft.currentUser = newUser;
        draft.isAuthentified = true;
      });

    case LOAD_USER:
      return produce(state, (draft) => {
        draft.currentUser = state.users.find(
          (user) => user.id === action.payload.id
        );
        draft.isAuthentified = true;
      });

    case LOG_OUT:
      return produce(state, (draft) => {
        draft.currentUser = {
          id: undefined,
          name: undefined,
          password: undefined,
          friendsID: undefined,
          friendsRequest: undefined,
        };
        draft.isAuthentified = false;
      });

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
          writerID: state.currentUser.id,
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
      return produce(state, (draft) => {
        draft.chatrooms.push({
          id: draft.chatrooms.length,
          name: "",
          ownerID: state.currentUser.id,
          membersID: action.payload.members,
          messages: [],
        });
      });

    case RENAME_CHATROOM:
      return produce(state, (draft) => {
        draft.chatrooms.find(
          (chatroom) => chatroom.id === action.payload.chatroomId
        ).name = action.payload.newName;
      });

    case ADD_MEMBER:
      return produce(state, (draft) => {
        const chatroomToEdit = draft.chatrooms.find(
          (chatroom) => chatroom.id === action.payload.chatroomId
        );
        chatroomToEdit.membersID = chatroomToEdit.membersID.concat(
          action.payload.newMember
        );
      });

    case EJECT_MEMBER:
      return produce(state, (draft) => {
        const chatroomToEdit = draft.chatrooms.find(
          (chatroom) => chatroom.id === action.payload.chatroomId
        );
        chatroomToEdit.membersID = chatroomToEdit.membersID.filter(
          (member) => member !== action.payload.userId
        );
      });

    case CHANGE_CURRENT_CHATROOM:
      return produce(state, (draft) => {
        draft.currentChatroomId = action.payload.id;
      });

    case LEAVE_CURRENT_CHATROOM:
      return produce(state, (draft) => {
        draft.currentChatroomId = null;
      });

    case LEAVE_CHATROOM:
      return produce(state, (draft) => {
        const chatroomToLeave = draft.chatrooms.find(
          (chatroom) => chatroom.id === action.payload.chatroomId
        );
        chatroomToLeave.membersID = chatroomToLeave.membersID.filter(
          (member) => member !== state.currentUser.id
        );
      });

    case SWITCH_CHATROOM_OWNER:
      return produce(state, (draft) => {
        draft.chatrooms.find(
          (chatroom) => chatroom.id === action.payload.chatroomId
        ).ownerID = action.payload.userId;
      });

    case ACCEPT_FRIEND_REQUEST:
      return produce(state, (draft) => {
        const sender = draft.users.find(
          (user) => user.id === action.payload.senderId
        );
        const receiver = draft.users.find(
          (user) => user.id === state.currentUser.id
        );
        sender.friendsID.push(state.currentUser.id);
        receiver.friendsID.push(action.payload.senderId);
        receiver.friendsRequest = receiver.friendsRequest.filter(
          (request) => request !== action.payload.senderId
        );
        draft.currentUser.friendsID.push(action.payload.senderId);
        draft.currentUser.friendsRequest = receiver.friendsRequest.filter(
          (request) => request !== action.payload.senderId
        );
      });

    case REJECT_FRIEND_REQUEST:
      return produce(state, (draft) => {
        const receiver = draft.users.find(
          (user) => user.id === state.currentUser.id
        );
        receiver.friendsRequest = receiver.friendsRequest.filter(
          (request) => request !== action.payload.senderId
        );
        draft.currentUser.friendsRequest = receiver.friendsRequest.filter(
          (request) => request !== action.payload.senderId
        );
      });

    case SEND_FRIEND_REQUEST:
      return produce(state, (draft) => {
        const receiver = draft.users.find(
          (user) => user.id === action.payload.receiverId
        );
        receiver.friendsRequest.push(state.currentUser.id);
      });

    case REMOVE_FRIEND:
      return produce(state, (draft) => {
        const friendToRemove = draft.users.find(
          (user) => user.id === action.payload.friendToRemove
        );
        const currentUser = draft.users.find(
          (user) => user.id === state.currentUser.id
        );
        friendToRemove.friendsID = friendToRemove.friendsID.filter(
          (friend) => friend !== state.currentUser.id
        );
        currentUser.friendsID = currentUser.friendsID.filter(
          (friend) => friend !== action.payload.friendToRemove
        );
        draft.currentUser.friendsID = draft.currentUser.friendsID.filter(
          (friend) => friend !== action.payload.friendToRemove
        );
      });

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
