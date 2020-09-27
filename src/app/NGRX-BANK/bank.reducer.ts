import { BetSlip, Bet, SingleBet } from './../Bet';
import * as BankActions from './bank.actions';


export interface State {
  BetSlip: BetSlip[];
  WonBets: SingleBet[];
  LostBets: {bets: Bet[], stake: number, potentialReturn: number, finalOdds: number, date: number}[];
  money: number;
  transactionArray: {transaction: string, amount: number, date: number}[];
  pendingWithdrawal: {amount: string, requestedOn: number, requestedUntil: number}[];
  reverseMoney: number;
  reverseIndex: number;
  openBets: {bets: Bet[], stake: number, potentialReturn: number, finalOdds: number, date: number}[];
}

const initialState: State = {
  BetSlip: [],
  WonBets: [],
  LostBets: [],
  money: 0,
  transactionArray: [],
  pendingWithdrawal: [],
  reverseMoney: 0,
  reverseIndex: 0,
  openBets: [],
};

export function bankReducer( state = initialState, action: BankActions.BankActions): any {
    switch (action.type) {
      case BankActions.ADD_TO_BETSLIP:
        const updatedBetSlip = [...state.BetSlip, action.payload.bet];
        return {
          ...state,
          BetSlip: updatedBetSlip,
        };
      case BankActions.CLEAR_BETSLIP:
        return {
          ...state,
          BetSlip: []
        };
      case BankActions.DELETE_BET:
        const newArray = state.BetSlip.filter((bet, index) => {
          return index !== action.payload;
        } );
        return {
          ...state,
          BetSlip: newArray,
        };
      case BankActions.DEPOSIT_MONEY:
        const updatedMoney = +state.money + action.payload;
        const transactionDeposit = {transaction: 'Deposit', amount: action.payload, date: new Date().getTime()};
        const updatedTransactionArray = [...state.transactionArray, transactionDeposit];
        return {
          ...state,
          money: updatedMoney,
          transactionArray: updatedTransactionArray,
        };
      case BankActions.WITHDRAWAL_MONEY:
        const minus = +state.money - action.payload;
        const transactionWithdraw = {transaction: 'Withdrawal', amount: action.payload, date: new Date().getTime()};
        const updatedTransactionAray = [...state.transactionArray, transactionWithdraw];
        const pendingTransaction = {
          amount: action.payload,
          requestedOn: new Date().getTime(),
          requestedUntil: new Date().getTime() + 36000,
        };
        const updatedPendingWithdrawal = [...state.pendingWithdrawal, pendingTransaction];
        return {
          ...state,
          money: minus.toFixed(2),
          transactionArray: updatedTransactionAray,
          pendingWithdrawal: updatedPendingWithdrawal,
        };
      case BankActions.REVERSE_START:
        return {
          ...state,
          reverseMoney: action.payload.money,
          reverseIndex: action.payload.index,
        };
      case BankActions.REVERSE_WITHDRAWAL:
        const newPendingArray = state.pendingWithdrawal.filter((transaction, index) => {
          return index !== state.reverseIndex;
        });
        const newMoney = +state.money + state.reverseMoney;
        return {
          ...state,
          money: newMoney.toFixed(2),
          pendingWithdrawal: newPendingArray,
        };
      case BankActions.ADD_OPEN_BET:
        const updatedMoneyy = (state.money - action.payload.stake).toFixed(2);
        const newpotentialReturn = 1 * action.payload.potentialReturn;
        const date = new Date().getTime();
        const bets = action.payload.bets;
        const finalOdds = action.payload.finalOdds;
        const stake = +action.payload.stake;
        const openBet = {bets, stake, newpotentialReturn, finalOdds, date};
        const newOpenBets = [...state.openBets, {...openBet}] ;
        return {
          ...state,
          money: updatedMoneyy,
          openBets: newOpenBets,
        };
      case BankActions.ADD_WON_BET:
        const newWonBets = [...state.WonBets, action.payload];
        const wonMoney = +state.money + action.payload.potentialReturn;
        return {
          ...state,
          money: wonMoney.toFixed(2),
          WonBets: newWonBets,
        };
      case BankActions.ADD_LOST_BET:
        const newLostBets = [...state.LostBets, action.payload];
        return {
          ...state,
          LostBets: newLostBets,
        };
      case BankActions.REMOVE_BET:
        const filteredBets = state.openBets.filter((bet, index) => {
          return index !== action.payload;
        });
        return {
          ...state,
          openBets: filteredBets,
        };
      case BankActions.FETCH_DATA_SUCCESS:
        const responseData = action.payload;
        console.log(action.payload);
        return{
          ...state,
          BetSlip: responseData.BetSlip ? [...responseData.BetSlip] : [],
          WonBets:  responseData.WonBets ? [...responseData.WonBets] : [],
          LostBets: responseData.LostBets ? [...responseData.LostBets] : [],
          money: responseData.money,
          transactionArray: responseData.transactionArray ? [...responseData.transactionArray] : [],
          pendingWithdrawal: responseData.pendingWithdrawal ? [...responseData.pendingWithdrawal] : [],
          openBets: responseData.openBets ? [...responseData.openBets] : [],
        };
      default: return state;
    }
}

