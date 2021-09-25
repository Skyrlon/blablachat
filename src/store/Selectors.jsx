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
