import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as BankActions from './../../NGRX-BANK/bank.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-bets',
  templateUrl: './show-bets.component.html',
  styleUrls: [ './show-bets.component.css'
  ]
})
export class ShowBetsComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;
  betslip = [];
  @Input() gamesArray = [];
  @Input() title: string;
  @Input() imageSrc: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('bank').pipe(
      map(bankState => {
        return bankState.BetSlip;
      })
    ).subscribe( BetSlip => {
      this.betslip = BetSlip;
    });
  }
 // Getting value of selected game //
  getValue(odd: string, home: string, away: string, type: string, i: number, position: string, game: any): void {
    const id = i + position;
    const bet = {home, away, type, odd, id};
    const check = this.betslip.findIndex( b => {
    return b.home === home;
   });
    if (check === -1) {
    this.store.dispatch(new BankActions.AddToBetSlip({bet}));
   }
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
