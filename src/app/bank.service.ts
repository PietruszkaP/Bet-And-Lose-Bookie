import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PendingTransaction, ReturnData, TransactionArray, BetArray, BetSlip, BetLoseArray} from './Bet';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  BetSlip: BetSlip[] = [];
  changedBetSlipArray = new BehaviorSubject<any>(this.BetSlip);
  money = 0;
  changedMoney = new BehaviorSubject<number>(0);
  openLength = new Subject<number>();
  openBets: BetArray[] = [];
  wonBets: BetArray[] = [];
  lostBets: BetLoseArray[] = [];
  settedTransactions: PendingTransaction[] = [];
  pendingWithdrawal = [];
  reverseWithdrawal: number;
  index: number;
  transactionArray = [];


  constructor( private http: HttpClient) { }

  getTransactionArray(): TransactionArray[] {
    return [...this.transactionArray];
  }

  getBetSlipArray(): void {
   this.changedBetSlipArray.next(this.BetSlip);
  }

  clearBetSlip(): void {
    this.BetSlip = [];
    this.changedBetSlipArray.next(this.BetSlip);
  }

  addToBetSlip(bet): void {
    this.BetSlip.push(bet);
    this.changedBetSlipArray.next(this.BetSlip);
  }

  returnData(): ReturnData {
    const transactionArray = this.transactionArray;
    const open = this.openBets;
    const won = this.wonBets;
    const lost = this.lostBets;
    const money = this.money;
    const pending = this.pendingWithdrawal;
    return  { transactionArray, open, won, lost, money, pending};
  }

  storeInformation(): void {
    this.http.post(
      'https://ng-complete-guide-e03f7.firebaseio.com/user-data.json',
      this.returnData()
      )
      .subscribe( response => {
      });
  }

  fetchData(): void {
    this.http
    .get('https://ng-complete-guide-e03f7.firebaseio.com/user-data.json')
    .pipe(
      map( responseData => {
      const dataArray = [];
      for ( const key in responseData) {
       if (responseData.hasOwnProperty) {
        dataArray.push({...responseData[key], id: key});
      }
    }
      return dataArray;
    }))
    .subscribe( responseData => {
      responseData.map( data => {
        this.money = data.money;
        this.changedMoney.next(this.money);
        if (data.transactionArray) {
          this.transactionArray = data.transactionArray;
        }
        if (data.open) {
          this.openBets = data.open;
        }
        if (data.lost) {
          this.lostBets = data.lost;
        }
        if (data.won) {
          this.wonBets = data.won;
        }
        if (data.pending) {
          this.pendingWithdrawal = data.pending;
        }
      });
    });
  }

  depositMoney(money: number): void {
    this.money += money;
    this.changedMoney.next(this.money);
    const transaction = {transaction: 'Deposit', amount: money, date: new Date().getTime()};
    this.transactionArray.push(transaction);
  }

  getPendingTransactions(): PendingTransaction[] {
    return this.pendingWithdrawal;
  }

  giveMoney(money: number, i: number): void {
    this.reverseWithdrawal = money;
    this.index = i;
  }

  getSettedBets(): PendingTransaction[] {
    return [...this.settedTransactions];
  }

  withdrawalMoney(money: number): void {
    this.money -= money;
    this.changedMoney.next(this.money);
    const pendingTransaction = {
      amount: money,
      requestedOn: new Date().getTime(),
      requestedUntil: new Date().getTime() + 36000,
    };
    this.pendingWithdrawal.push(pendingTransaction);
    const transaction = {transaction: 'Withdrawal', amount: money, date: new Date().getTime()};
    this.transactionArray.push(transaction);
  }

  getMoney(): number {
    return this.money;
  }

  addOpenBet(bets, stake, potentialReturn, finalOdds): void {
    this.money = +(this.money - stake);
    this.changedMoney.next(this.money);
    const newpotentialReturn = 1 * potentialReturn;
    const id = 1;
    const date = new Date().getTime();
    this.openBets.push({bets, newpotentialReturn, stake, finalOdds, id, date });
    this.openLength.next(this.openBets.length);
  }

  getOpenBets(): BetArray[] {
    return [...this.openBets];
  }

  getLostBets(): any[] {
    console.log([this.lostBets]);
    return [...this.lostBets];
  }

  getWonBets(): any{
    return [...this.wonBets];
  }

  addWonBets(wonBet): void {
    this.wonBets.push(wonBet);
    this.openLength.next(this.openBets.length);
    const potentialReturn = wonBet.map( data => {
      return data.newpotentialReturn;
    });
    this.money = +this.money + +potentialReturn;
    this.changedMoney.next(this.money);
  }

  addLostBets( lostBet ): void {
    console.log(lostBet);
    this.openLength.next(this.openBets.length);
    this.lostBets.push(lostBet);
  }

}
