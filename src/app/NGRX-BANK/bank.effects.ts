import {Actions, Effect, ofType} from '@ngrx/effects';
import * as BankActions from './bank.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import {InitialData} from '../Bet';

@Injectable()
export class BankEffects {
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
  @Effect()
  fetchData = this.actions$.pipe(
    ofType(BankActions.FETCH_DATA),
    switchMap(() => {
      return this.http
        .get('https://ng-complete-guide-e03f7.firebaseio.com/user-data.json');
    }),
    map((responseData: any) => {
      // because response is a shitty object that has some strange Id as a first property (kind a wrapper for our data)
      for (const key in responseData) {
        if (responseData.hasOwnProperty) {
          return responseData[key] as InitialData;
        }
      }
    }),
    map((response: any) => {
        const payload = {
          ...response,
          money: parseFloat(response.money)
        } as InitialData;

        return new BankActions.FetchDataSuccess(payload);
      }
    )
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }
}
