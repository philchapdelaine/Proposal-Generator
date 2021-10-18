const INITIAL_STATE = {
  username: "",
  password: "",
  loggedIn: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TRY_LOGIN":
      return {
        ...state,
        username: action.payload["username"],
        password: action.payload["password"],
      };

    case "SUCCESSFUL_LOGIN":
      return { ...state, loggedIn: true };

    case "FAILED_LOGIN":
      return { ...state, password: "", loggedIn: false };

    case "LOG_OUT":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default loginReducer;

//  merely sample from:
// https://github.com/kenhyj/Traceify/tree/master/client/src/redux/reducers
