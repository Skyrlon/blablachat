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

export const getChatroomsNames = (chatrooms, currentUserId) => {
  return (state) => {
    const chatroomsToLookAt = state.chatrooms.filter((chatroom) =>
      chatrooms.some((x) => x.id === chatroom.id)
    );
    return chatroomsToLookAt.map((chatroom) => {
      if (chatroom.name.length > 0) {
        return { id: chatroom.id, name: chatroom.name };
      } else {
        const membersNames = chatroom.membersID
          .filter((member) => member !== currentUserId)
          .map((member) => state.users.find((user) => member === user.id).name);
        return {
          id: chatroom.id,
          name: membersNames.join(", "),
        };
      }
    });
  };
};

export const getCharoomOwnerId = (chatroomId) => {
  return (state) =>
    state.chatrooms.find((chatroom) => chatroom.id === chatroomId).ownerID;
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

export const getUsersFound = (text, currentUserId) => {
  return (state) => {
    if (text.length === 0) return [];
    const currentUser = state.users.find((user) => user.id === currentUserId);
    const usersFound = state.users.filter(
      (user) =>
        user.name.toLowerCase().startsWith(text.toLowerCase()) &&
        !currentUser.friendsID.includes(user.id)
    );
    return usersFound.map((user) => {
      return { id: user.id, name: user.name };
    });
  };
};
