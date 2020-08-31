import { Component, OnInit } from '@angular/core';
import { BankService } from 'src/app/bank.service';

@Component({
  selector: 'app-balance-transfer',
  templateUrl: './balance-transfer.component.html',
  styleUrls: ['./balance-transfer.component.css']
})
export class BalanceTransferComponent implements OnInit {


  transactionArray = [];

  constructor(private bank: BankService) { }

  ngOnInit(): void {
   this.transactionArray = this.bank.getTransactionArray();
  }

}
