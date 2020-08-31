
export interface BetArray {
    bets: [{game: string, odd: string}];
    date: number;
    finalOdds: string;
    id: number;
    newpotentialReturn: number | string;
    stake: string;
}

export interface BetLoseArray {
  [index: number]: [
    {bets: [{game: string, odd: string}],
    date: number,
    finalOdds: string,
    id: number,
    newpotentialReturn: number | string,
    stake: string}];

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

export interface ReturnData {
  transactionArray: any[];
  open: any[];
  won: any[];
  lost: any[];
  money: number;
  pending: any[];
}
export interface TransactionArray {
  amount: number | string;
  date: number;
  transaction: string;
}
