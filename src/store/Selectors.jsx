export const getUsers = () => {
  return (state) => state.users;
};

export const getCurrentUser = (id) => {
  return (state) => state.users.find((user) => user.id === id);
};

export const getChatrooms = (id) => {
  return (state) =>
    state.chatrooms.filter((chatroom) => chatroom.membersID.includes(id));
};

export const getMessages = (chatroomId) => {
  return (state) =>
    state.chatrooms.find((chatroom) => chatroom.id === chatroomId).messages;
};

export const getMembers = (chatroomId) => {
  return (state) => {
    const members = state.chatrooms.find(
      (chatroom) => chatroom.id === chatroomId
    ).membersID;
    return members.map((member) => {
      return {
        id: state.users.find((user) => member === user.id).id,
        name: state.users.find((user) => member === user.id).name,
      };
    });
  };
};

export const getCurrentUserFriends = (id) => {
  return (state) => {
    const currentUser = state.users.find((user) => user.id === id);
    if (!currentUser) return undefined;
    return currentUser.friendsID.map((friendID) => {
      return {
        id: friendID,
        name: state.users.find((user) => user.id === friendID).name,
      };
    });
  };
};

export const getUserName = (id) => {
  return (state) => state.users.find((user) => user.id === id).name;
};

export const getCurrentUserFriendsRequest = (id) => {
  return (state) => {
    const currentUser = state.users.find((user) => user.id === id);
    if (!currentUser) return undefined;
    return currentUser.friendsRequest.map((requestId) => {
      return {
        id: requestId,
        name: state.users.find((user) => user.id === requestId).name,
      };
    });
  };
};
