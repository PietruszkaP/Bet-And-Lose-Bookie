import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as BankActions from './../../NGRX-BANK/bank.actions';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  title = 'Debit Card';

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }
  addTitle(title: string): void {
  this.title = title;
  }

  deposit(form: NgForm): void {
  const money = form.value.amount;
  this.store.dispatch(new BankActions.DepositMoney(+money));
  // Router direct first fo Loading spinner then dislay alert Success
  this.router.navigate(['/loading']);
  setTimeout( () => {
    this.router.navigate(['/account/bet/success']);
  }, 1000);
  form.reset();
  }

}
