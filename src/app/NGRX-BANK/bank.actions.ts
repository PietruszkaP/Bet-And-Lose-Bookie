import {Action} from '@ngrx/store';
import {Bet} from '../Bet';
import {InitialData} from './../Bet';


export const ADD_TO_BETSLIP = '[Bank] Add To Betslip';
export const CLEAR_BETSLIP = '[Bank] Clear Beatslip';
export const DELETE_BET = '[Bank] Delete Bet';
export const DEPOSIT_MONEY = '[Bank] Deposit Money';
export const WITHDRAWAL_MONEY = '[Bank] Withdrawal Money';
export const REVERSE_START = '[Bank] Reverse Start';
export const REVERSE_WITHDRAWAL = '[Bank] Reverse Withdrawal';
export const ADD_OPEN_BET = '[Bank] Add Open Bet';
export const ADD_WON_BET = '[Bank] Add Won Bet';
export const ADD_LOST_BET = '[Bank] Add Lost Bet';
export const REMOVE_BET = '[Bank] Remove Bet';
export const FETCH_DATA = '[Bank] Fetch Data';
export const FETCH_DATA_SUCCESS = '[Bank] Fetch Data Success';
export const STORE_DATA = '[Bank] Store Data';

export class AddToBetSlip implements Action {
  readonly type = ADD_TO_BETSLIP;

  constructor(public payload: { bet: any }) {
  }
}

export class ClearBetSlip implements Action {
  readonly type = CLEAR_BETSLIP;
}

export class DeleteBet implements Action {
  readonly type = DELETE_BET;

  constructor(public payload: number) {
  }
}

export class DepositMoney implements Action {
  readonly type = DEPOSIT_MONEY;

  constructor(public payload: number) {
  }
}

export class WithdrawalMoney implements Action {
  readonly type = WITHDRAWAL_MONEY;

  constructor(public payload: number) {
  }
}

export class ReverseStart implements Action {
  readonly type = REVERSE_START;

  constructor(public payload: { index: number, money: number }) {
  }
}

export class ReverseWithdrawal implements Action {
  readonly type = REVERSE_WITHDRAWAL;
}

export class AddOpenBet implements Action {
  readonly type = ADD_OPEN_BET;

  constructor(public payload: { bets: Bet[], stake: number, potentialReturn: number, finalOdds: number }) {
  }
}

export class AddWonBet implements Action {
  readonly type = ADD_WON_BET;

  constructor(public payload: { bets: Bet[], stake: number, potentialReturn: number, finalOdds: number, date: number }) {
  }
}

export class AddLostBet implements Action {
  readonly type = ADD_LOST_BET;

  constructor(public payload: { bets: Bet[], stake: number, potentialReturn: number, finalOdds: number, date: number }) {
  }
}

export class RemoveBet implements Action {
  readonly type = REMOVE_BET;

  constructor(public payload: number) {
  }
}

export class FetchData implements Action {
  readonly type = FETCH_DATA;
}

export class FetchDataSuccess implements Action {
  readonly type = FETCH_DATA_SUCCESS;

  constructor(public payload: InitialData) {
  }
}

export class StoreData implements Action {
  readonly type = STORE_DATA;
}

export type BankActions = AddToBetSlip |
  AddWonBet |
  RemoveBet |
  AddLostBet |
  ClearBetSlip |
  FetchData |
  FetchDataSuccess |
  StoreData |
  DeleteBet |
  DepositMoney |
  WithdrawalMoney |
  ReverseWithdrawal |
  ReverseStart |
  AddOpenBet;
