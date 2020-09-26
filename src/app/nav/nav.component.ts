import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import * as BankActions from './../NGRX-BANK/bank.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isLogged = false;
  userSub: Subscription;

  constructor(private router: Router, private auth: AuthService,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      })
    ).subscribe( user => {
      this.isLogged = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  direct(): void {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/register/step1']);
    }, 1000);
  }

  logout(): void {
    this.isLogged = false;
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }
  save(): void {
    this.http.delete('https://ng-complete-guide-e03f7.firebaseio.com/user-data.json').subscribe();
    this.store.dispatch(new BankActions.StoreData());
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/bet/success']);
    }, 2000);
  }
}


