export const getUsers = () => {
  return (state) => state.users;
};

export const getCurrentUser = (id) => {
  return (state) => state.users.find((user) => user.id === id);
};
