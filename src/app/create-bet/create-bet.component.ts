import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bet } from '../Bet';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as BankActions from './../NGRX-BANK/bank.actions';

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrls: ['./create-bet.component.css']
})
export class CreateBetComponent implements OnInit {
  bets: Bet[] = [
  ];
  money: number;
  finalOdds = 1;
  score: number;
  @ViewChild('stake') read: ElementRef;
  stake: number;
  potentialReturn: number;
  title: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('bank').pipe(bankState => {
      return bankState;
    }).subscribe( bankState => {
      this.money = bankState.money;
    });
  }

  onAddBet(form: NgForm): void {
    const game = form.value.game;
    const odd = form.value.odd;
    const bet: Bet = {game, odd};
    this.finalOdds = 1;
    if (form.valid) {
     this.bets.push(bet);
     this.bets.map( b => {
      return this.finalOdds = (this.finalOdds * b.odd);
     });
     form.reset();
    }
    this.finalOdds = +this.finalOdds.toFixed(2);
  }

  placeBet(): void{
    this.stake = this.read.nativeElement.value;
    if ( +this.stake > +this.money) {
      return alert(`Your balance is ${this.money} and you try to bet ${this.stake}`);
    }
    this.potentialReturn = +(this.stake * this.finalOdds).toFixed(2);
    this.store.dispatch(new BankActions.AddOpenBet({bets: [...this.bets],
                                                    stake: this.stake,
                                                    potentialReturn: this.potentialReturn,
                                                    finalOdds: +this.finalOdds.toFixed(2)}));
    this.bets = [];
    this.router.navigate(['/account/open']);
  }
}

