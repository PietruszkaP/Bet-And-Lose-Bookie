import { Actions, Effect, ofType } from '@ngrx/effects';
import * as BankActions from './bank.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';

@Injectable()
export class BankEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {}

  @Effect({dispatch: false})
  storeData = this.actions$.pipe(
    ofType(BankActions.STORE_DATA),
    withLatestFrom(this.store.select('bank')),
    switchMap(([actionData, bankState]) => {
      return this.http.post(
      'https://ng-complete-guide-e03f7.firebaseio.com/user-data.json',
       bankState
      );
    })
  );

  @Effect({dispatch: false})
  fetchData = this.actions$.pipe(
    ofType(BankActions.FETCH_DATA),
    switchMap(() => {
       return this.http
    .get('https://ng-complete-guide-e03f7.firebaseio.com/user-data.json');
    }),
    map( responseData => {
        const dataArray = [];
        for ( const key in responseData) {
         if (responseData.hasOwnProperty) {
          dataArray.push({...responseData[key], id: key});
        }
      }
        return dataArray;
      }),
    map( dataArray => {
      dataArray.map( response => {
        this.store.dispatch(new BankActions.SetInitialData(response));
      });
    })
  );
}
