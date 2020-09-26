

export interface InitialData {
  BetSlip?: BetSlip[];
  LostBets?: SingleBet[];
  WonBets?: SingleBet[];
  money: string;
  openBets?: SingleBet[];
  pendingWithdrawal?: PendingTransaction[];
  reverseIndex: number;
  reverseMoney: number;
  transactionArray?: TransactionArray[];
}

export interface SingleBet {
    bets: Bet[];
    date: number;
    finalOdds: number;
    id?: number;
    newpotentialReturn: number | string;
    stake: number;
}

export interface BetSlip {
  home: string;
  away: string;
  type: string;
  odd: string;
  id: string | number;
}


export interface Bet {
  game: string;
  odd: number;
  potentialReturn?: number;
}

export interface PendingTransaction {
  amount: string;
  requestedOn: number;
  requestedUntil: number;
}

// export interface ReturnData {
//   transactionArray: any[];
//   open: any[];
//   won: any[];
//   lost: any[];
//   money: number;
//   pending: any[];
// }
export interface TransactionArray {
  transaction: string;
  amount: number;
  date: number;
}

export class User {
  constructor(public email: string,
              public id: string,
              public _token: string,
              public _tokenExpirationDate: Date) {}
}
