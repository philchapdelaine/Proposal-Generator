export const tryLogin = (credentials) => {
  return {
    type: "TRY_LOGIN",
    payload: credentials,
  };
};

export const successLogin = () => {
  return {
    type: "SUCCESSFUL_LOGIN",
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

export const failLogin = () => {
  return {
    type: "FAILED_LOGIN",
  };
};
