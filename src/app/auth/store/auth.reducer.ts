import { User } from './../../Bet';
import * as AuthActions from './auth.actions';




export interface State {
  user: User;
  authError: string;
}

const initialState: State = {
  user: null,
  authError: null,
};

// tslint:disable-next-line:typedef
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(action.payload.email,
                            action.payload.userId,
                            action.payload._token,
                            action.payload.expirationDate);
      return {
        ...state,
        user,
        authError: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
      };
    case AuthActions.SIGNUP_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        user: null,
        authError: null,
      };
    default: return state;
  }
}
