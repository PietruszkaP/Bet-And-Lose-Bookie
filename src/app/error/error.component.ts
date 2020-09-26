import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  error: string;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit(): void {
   this.storeSub = this.store.select('auth').pipe(map( authState => {
      return authState.authError;
    }))
    .subscribe( authError => {
      this.error = authError;
    });
  }

  clearError(): void {
    this.router.navigate(['/register/step1']);
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
   this.storeSub.unsubscribe();
  }
}
