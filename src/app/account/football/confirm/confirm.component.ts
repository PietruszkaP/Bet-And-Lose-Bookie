import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/app.reducer';
import * as BankActions from './../../../NGRX-BANK/bank.actions';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  money = 0;
  finalOdds = 1;
  betslip = [];
  stake: number;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('bank').pipe(
      map(bankState => {
        return bankState;
      })
    ).subscribe( bankState => {
      this.betslip = bankState.BetSlip;
      this.money = +bankState.money;
    });
  }

  mouseOver(): void {
    this.finalOdds = 1;
    this.betslip.map( bet => {
      this.finalOdds = (this.finalOdds * bet.odd);
    });
  }
  // Method wchih add new Bet to service from Footbal Voleyball nad Basketball component
  onSubmit(stake: number): void {
    if ( stake > this.money) {
      return alert('You dont have enough credit !!! ');
    }

    const finalReturn = +stake * this.finalOdds;
    const bets = [];
    this.betslip.map( b => {
      const game = b.home + ' - ' + b.away;
      bets.push({ game, odd: b.odd });
    });
    const bet = {bets: [...bets], stake, potentialReturn: +finalReturn.toFixed(2), finalOdds: +this.finalOdds.toFixed(2) };
    this.store.dispatch(new BankActions.AddOpenBet(bet));
    this.router.navigate(['/account/open']);
    this.store.dispatch(new BankActions.ClearBetSlip());
  }

}
