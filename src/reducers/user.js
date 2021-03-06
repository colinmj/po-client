const reducer = (users = [], action) => {
  switch (action.type) {
    case "CREATE_USER":
      return [...users, action.payload];

    default:
      return users;
  }
};

export default reducer;
