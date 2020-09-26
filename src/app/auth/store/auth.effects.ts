import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../Bet';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as BankActions from './../../NGRX-BANK/bank.actions';


export interface AuthResponseData{
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date( new Date().getTime() + +resData.expiresIn * 1000 );
  const user = new User( resData.email,
                         resData.localId,
                         resData.idToken,
                         expirationDate);
  localStorage.setItem('userDATA', JSON.stringify(user));
  return new AuthActions.AuthenticateSucces({email: resData.email,
                                  userId: resData.localId,
                                  _token: resData.idToken,
                                  expirationDate});
};

const handleError = (errorRes) => {
  let errorMessage = 'An unknowen error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
      return of( new AuthActions.AuthenticateFail(errorMessage));
    }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exists';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Your password is invalid';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};



@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>,
              private router: Router,
              private auth: AuthService) {}

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return  this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5OzB-TMXNeMuBElYd23Q4k4UopvbPcQ4' , {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true,
      }).pipe(
        tap(resData => {
          this.auth.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map( resData => {
            return handleAuthentication(resData);
           }
           ),
          catchError( errorRes => {
            let errorMessage = 'An unknowen error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of( new AuthActions.SignupFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
              }
            return of(new AuthActions.SignupFail(errorMessage));
           }
           ));
      })
    );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>
      ( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5OzB-TMXNeMuBElYd23Q4k4UopvbPcQ4',
       {
         email: authData.payload.email,
         password: authData.payload.password,
         returnSecureToken: true,
       }).pipe(
        tap(resData => {
          this.auth.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map( resData => {
        return handleAuthentication(resData);
         }
         ),
        catchError( errorRes => {
          return handleError(errorRes);
         }
         ));
    })
  );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap(() => {
             this.router.navigate(['/loading']);
             setTimeout( () => {
          this.router.navigate(['/account/football']);
        }, 800);
      })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this.auth.clearLogOutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/']);
      })
    );
    @Effect()
    autoLogin = this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string,
          id: string,
          _token: string,
          _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userDATA'));
        if (!userData) {
          return {type: 'DUMMY'};
        }
        this.store.dispatch(new BankActions.FetchData());
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser._token) {
          const expiredIn =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.auth.setLogoutTimer(expiredIn);
          // this.store.dispatch(new BankActions.FetchData());
          return new AuthActions.AuthenticateSucces({email: userData.email,
                                                     userId: userData.id,
                                                     _token: userData._token,
                                                     expirationDate: new Date(userData._tokenExpirationDate)});
        }
        return { type: 'DUMMY'};
      })
    );


    @Effect({dispatch: false})
    authFail = this.actions$.pipe(
      ofType(AuthActions.SIGNUP_FAIL),
      tap(() => {
          this.router.navigate(['/loading']);
          setTimeout( () => {
        this.router.navigate(['/register/step3/error']);
      }, 800);
      })
    );
}
