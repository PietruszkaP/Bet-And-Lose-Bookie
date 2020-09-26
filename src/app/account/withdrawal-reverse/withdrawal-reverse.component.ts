import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as BankActions from './../../NGRX-BANK/bank.actions';

@Component({
  selector: 'app-withdrawal-reverse',
  templateUrl: './withdrawal-reverse.component.html',
  styleUrls: ['./withdrawal-reverse.component.css']
})
export class WithdrawalReverseComponent implements OnInit {

  pendingWithdrawals = [];
  total = 0;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.store.select('bank').pipe(bankState => {
     return bankState;
   }).subscribe(bankState => {
     this.pendingWithdrawals = bankState.pendingWithdrawal;
   });
   this.pendingWithdrawals.map( withdrawal => {
    return this.total += +withdrawal.amount;
   });
  }

  reverseWithdrawal(money: number, i: number): void {
    this.store.dispatch(new BankActions.ReverseStart({index: +i, money: +money}));
  }
  completeReverse(): void {
    this.store.dispatch(new BankActions.ReverseWithdrawal());
    // For better user experience
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/bet/success']);
    }, 800);
  }

  goDeposit(): void {
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/deposit']);
    }, 800);
  }
}
