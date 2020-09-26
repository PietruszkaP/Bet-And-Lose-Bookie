import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit, OnDestroy {

  openBetsArray: number;
  money: number;
  name: string;
  open = false;
  user: any;
  myAccount = false;
  storeSub: Subscription;


  constructor(private router: Router,
              private auth: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('bank').pipe(bankState => {
      return bankState;
    }).subscribe( State => {
      this.money = State.money;
      this.openBetsArray = State.openBets.length;
    });
  }


  showDiv(): void{
    this.open = !this.open;
    this.myAccount = false;
    this.storeSub = this.store.select('auth').pipe(
      map( authState => {
        return authState.user;
      })
    ).subscribe( user => {
      this.user = user;
    });
  }

  onLogOut(): void {
    this.open = false;
    this.store.dispatch(new AuthActions.Logout());
  }

  onDeposit(): void {
    this.open = false;
    this.myAccount = false;
    this.router.navigate(['/account/deposit']);
  }
  gamblingControls(): void {
    this.open = false;
    this.router.navigate(['/control/spending']);
  }
  onWithdraw(): void {
    this.open = false;
    this.router.navigate(['/account/withdrawal']);
  }
  openBets(): void {
    this.open = false;
    this.myAccount = false;
    this.router.navigate(['/account/open']);
  }
  createBet(): void {
    this.open = false;
    this.router.navigate(['/account/bet']);

  }
  reverseWithdrawal(): void {
    this.open = false;
    this.router.navigate(['/account/withdrawal-reverse']);
  }
  contact(): void {
    this.open = false;
    this.router.navigate(['/control/contact']);
  }
  balanceTransfer(): void {
    this.open = false;
    this.router.navigate(['/account/balance-transfer']);
  }
  settedBets(): void {
    this.open = false;
    this.router.navigate(['/account/setted']);
  }
  goToMyaccount(): void {
    this.open = false;
    this.myAccount = true;
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
