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

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const store = createStore(reducer);
