import * as fromAuth from './../auth/store/auth.reducer';
import * as fromBank from './../NGRX-BANK/bank.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  bank: fromBank.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  bank: fromBank.bankReducer,
};
