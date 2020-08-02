import { toast } from 'react-toastify';
const INITIAL_STATE = {
  loggedIn: false,
  user: ''
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      storeData(action.payload);
      return { ...state, loggedIn: true, user: action.payload };
    case 'LOGOUT':
      toast.success('Logout realizado com sucesso!');
      removeData();
      return { ...state, loggedIn: false, user: '' };
    default:
      return state;
  }
}

const storeData = async (data) => {
  try {
    await localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    // Error saving data
  }
};

const removeData = async () => {
  try {
    await localStorage.removeItem('user');
  } catch (error) {
    // Error saving data
  }
};
