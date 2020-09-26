import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as BankActions from './../../NGRX-BANK/bank.actions';


@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  money: number;
  amount: number;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('bank').pipe(bankState => {
      return bankState;
    }).subscribe( bankState => {
      this.money = bankState.money;
    });
  }

  withdrawal(amount: number): void {
    this.store.dispatch(new BankActions.WithdrawalMoney(amount));
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/bet/success']);
    }, 800);
  }
}

