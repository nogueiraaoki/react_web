import { ROUTES } from "../../config/routes";

export function loginAction(params) {
  return dispatch => {
    dispatch({ type: 'LOGIN', payload: params });
  };
}

export function logoutAction(pageChange) {
  return dispatch => {
    pageChange(ROUTES.login.info.url)
    dispatch({ type: 'LOGOUT' });
  };
}
