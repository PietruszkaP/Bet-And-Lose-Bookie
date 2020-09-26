import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as BankActions from './../../NGRX-BANK/bank.actions';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  betSlip = [];
  open = false;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
              private location: Location) { }

  ngOnInit(): void {
      this.store.select('bank').pipe(
        map( bankState => {
          return bankState.BetSlip;
        })
      ).subscribe(betSlip => {
        if (betSlip) {
          this.open = true;
          this.betSlip = betSlip;
        }
      });
  }

  openBetSlip(): void {
    this.open = !this.open;
  }
  // Method clear BetSlip Array in service and refresh component
  clearBetslip(): void {
    this.store.dispatch(new BankActions.ClearBetSlip());
    setTimeout( () => {
      this.router.navigateByUrl('/refresh', { skipLocationChange: true}).then( () => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
    }, 10);
  }
  // Method delete selected bet
  delete(index: number): void {
    this.store.dispatch(new BankActions.DeleteBet(index));
  }
}
