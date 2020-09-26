import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as BankActions from './../NGRX-BANK/bank.actions';
import * as fromApp from './../store/app.reducer';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit {

  openBets = [];
  date = new Date().getTime();

  constructor(private location: Location, private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.store.select('bank').pipe( bankState => {
      return bankState;
    }).subscribe( bankState => {
      this.openBets = bankState.openBets;
    });
  }

  changeStyle(): { 'justify-content': string} {
    if (this.openBets.length === 1 ) {
      return { 'justify-content' : 'flex-start'};
    }
    if (this.openBets.length === 4) {
      return { 'justify-content' : 'flex-start'};
    }
  }

  addToLoseBets(i: number): void {
    const lostBet = this.openBets.filter( (bets, index) => {
      return index === i;
      });
    this.store.dispatch(new BankActions.AddLostBet({bets: lostBet[0].bets,
                                                    stake: lostBet[0].stake,
                                                    potentialReturn: lostBet[0].newpotentialReturn,
                                                    finalOdds: lostBet[0].finalOdds,
                                                    date: this.date}));
    this.store.dispatch(new BankActions.RemoveBet(i));
  }

addToWonBets(i: number): void {
  const wonBet = this.openBets.filter( (bet, index) => {
    return index === i;
  });
  this.store.dispatch(new BankActions.AddWonBet({bets: wonBet[0].bets,
                                                 stake: wonBet[0].stake,
                                                 potentialReturn: wonBet[0].newpotentialReturn,
                                                 finalOdds: wonBet[0].finalOdds,
                                                 date: this.date}));
  this.store.dispatch(new BankActions.RemoveBet(i));
  }

}
