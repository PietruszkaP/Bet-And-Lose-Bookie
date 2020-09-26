import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    email: string;
    password: string;
    usedEmails = [];
    private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) { }

  getDetails(form: NgForm): void{
      this.email = form.value.email;
      this.password = form.value.password;
      this.usedEmails.push(this.email);
  }

  singUP(): void {
    this.store.dispatch(new AuthActions.SignupStart({email: this.email, password: this.password}));
  }

    setLogoutTimer(expiredTime): void {
      this.tokenExpirationTimer =  setTimeout(() => {
        this.store.dispatch(new AuthActions.Logout());
      }, expiredTime);
    }

    clearLogOutTimer(): void {
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
    }
}


