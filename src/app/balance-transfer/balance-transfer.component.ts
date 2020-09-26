import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';

@Component({
  selector: 'app-balance-transfer',
  templateUrl: './balance-transfer.component.html',
  styleUrls: ['./balance-transfer.component.css']
})
export class BalanceTransferComponent implements OnInit {


  transactionArray = [];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('bank').subscribe( bank => {
      this.transactionArray = bank.transactionArray;
    });
  }

}
