const initialState = {
  serverTimestamp: new Date(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'update-server-timestamp': {
      return {
        ...state,
        serverTimestamp: action.param,
      };
    }
    default:
      return state;
  }
};
