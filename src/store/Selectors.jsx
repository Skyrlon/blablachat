export const getUsers = () => {
  return (state) => state.users;
};

export const getIsAuthentified = () => (state) => state.isAuthentified;

export const getCurrentUserId = () => (state) => state.currentUser.id;

export const getCurrentUserFriends = () => {
  return (state) => {
    const currentUser = state.currentUser;
    return currentUser.friendsID.map((friendID) => {
      return {
        id: friendID,
        name: state.users.find((user) => user.id === friendID).name,
      };
    });
  };
};

export const getCurrentUserFriendsRequest = () => {
  return (state) => {
    const currentUser = state.currentUser;
    if (!currentUser.friendsRequest) return [];
    return currentUser.friendsRequest.map((requestId) => {
      return {
        id: requestId,
        name: state.users.find((user) => user.id === requestId).name,
      };
    });
  };
};

export const getChatrooms = () => {
  return (state) =>
    state.chatrooms.filter((chatroom) =>
      chatroom.membersID.includes(state.currentUser.id)
    );
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

export const getCurrentChatroomId = () => (state) => state.currentChatroomId;

export const getChatroomName = (chatroomId) => {
  return (state) => {
    const chatroomToLookAt = state.chatrooms.find(
      (chatroom) => chatroom.id === chatroomId
    );

    if (chatroomToLookAt.name.length > 0) {
      return chatroomToLookAt.name;
    } else {
      const membersNames = chatroomToLookAt.membersID
        .filter((member) => member !== state.currentUser.id)
        .map((member) => state.users.find((user) => member === user.id).name);
      return membersNames.join(", ");
    }
  };
};

export const getCharoomOwnerId = (chatroomId) => {
  return (state) =>
    state.chatrooms.find((chatroom) => chatroom.id === chatroomId).ownerID;
};

export const getUserName = (id) => {
  return (state) => state.users.find((user) => user.id === id).name;
};

export const getUsersFound = (text) => {
  return (state) => {
    if (text.length === 0) return [];
    const currentUserFriends = state.currentUser.friendsID;
    const usersFound = state.users.filter(
      (user) =>
        user.name.toLowerCase().startsWith(text.toLowerCase()) &&
        !currentUserFriends.includes(user.id)
    );
    return usersFound.map((user) => {
      return { id: user.id, name: user.name };
    });
  };
};

export const getChatroomsWhoUserIsOwner = (userId) => {
  return (state) =>
    state.chatrooms.filter((chatroom) => chatroom.ownerID === userId);
};

export const getChatroomsToModifyMembers = (userId) => {
  return (state) =>
    state.chatrooms.filter(
      (chatroom) =>
        chatroom.ownerID === state.currentUser.id &&
        chatroom.membersID.includes(userId)
    );
};
