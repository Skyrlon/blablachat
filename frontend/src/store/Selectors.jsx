export const getUsers = () => {
  return (state) => state.old.users;
};

export const getIsAuthentified = () => (state) => state.old.isAuthentified;

export const getCurrentUserId = () => (state) => state.old.currentUser.id;

export const getCurrentUserFriends = () => {
  return (state) => {
    const currentUser = state.old.currentUser;
    return currentUser.friendsID?.map((friendID) => {
      return {
        id: friendID,
        name: state.old.users.find((user) => user.id === friendID).name,
      };
    });
  };
};

export const getCurrentUserFriendsRequest = () => {
  return (state) => {
    const currentUser = state.old.currentUser;
    if (!currentUser.friendsRequest) return [];
    return currentUser.friendsRequest.map((requestId) => {
      return {
        id: requestId,
        name: state.old.users.find((user) => user.id === requestId).name,
      };
    });
  };
};

export const getChatrooms = () => {
  return (state) =>
    state.old.chatrooms.filter((chatroom) =>
      chatroom.membersID.includes(state.old.currentUser.id)
    );
};

export const getMessages = (chatroomId) => {
  return (state) =>
    state.old.chatrooms.find((chatroom) => chatroom.id === chatroomId).messages;
};

export const getMembers = (chatroomId) => {
  return (state) => {
    const members = state.old.chatrooms.find(
      (chatroom) => chatroom.id === chatroomId
    ).membersID;
    return members.map((member) => {
      return {
        id: state.old.users.find((user) => member === user.id).id,
        name: state.old.users.find((user) => member === user.id).name,
      };
    });
  };
};

export const getCurrentChatroomId = () => (state) =>
  state.old.currentChatroomId;

export const getChatroomName = (chatroomId) => {
  return (state) => {
    const chatroomToLookAt = state.old.chatrooms.find(
      (chatroom) => chatroom.id === chatroomId
    );

    if (chatroomToLookAt.name.length > 0) {
      return chatroomToLookAt.name;
    } else {
      const membersNames = chatroomToLookAt.membersID
        .filter((member) => member !== state.old.currentUser.id)
        .map(
          (member) => state.old.users.find((user) => member === user.id).name
        );
      return membersNames.join(", ");
    }
  };
};

export const getCharoomOwnerId = (chatroomId) => {
  return (state) =>
    state.old.chatrooms.find((chatroom) => chatroom.id === chatroomId).ownerID;
};

export const getUserName = (id) => {
  return (state) => state.old.users.find((user) => user.id === id).name;
};

export const getUsersFound = (text) => {
  return (state) => {
    if (text.length === 0) return [];
    const currentUserFriends = state.old.currentUser.friendsID;
    const usersFound = state.old.users.filter(
      (user) =>
        user.name.toLowerCase().startsWith(text.toLowerCase()) &&
        !currentUserFriends.includes(user.id) &&
        user.id !== state.old.currentUser.id
    );
    return usersFound.map((user) => {
      return { id: user.id, name: user.name };
    });
  };
};

export const getChatroomsWhoUserIsOwner = (userId) => {
  return (state) =>
    state.old.chatrooms.filter((chatroom) => chatroom.ownerID === userId);
};

export const getChatroomsToModifyMembers = (userId) => {
  return (state) =>
    state.old.chatrooms.filter(
      (chatroom) =>
        chatroom.ownerID === state.old.currentUser.id &&
        chatroom.membersID.includes(userId)
    );
};
