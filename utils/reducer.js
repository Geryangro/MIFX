const initialState = {
  email: null,
  token: null,
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...prevState,
        email: action.email,
        token: action.token,
      };
    case 'LOGIN':
      return {
        ...prevState,
        email: action.email,
        token: action.token,
      };
    case 'LOGOUT':
      return {
        email: null,
        token: null,
      };
  }
};

export {initialState, loginReducer};
