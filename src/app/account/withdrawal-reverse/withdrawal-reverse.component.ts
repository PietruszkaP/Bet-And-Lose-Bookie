import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BankService } from 'src/app/bank.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-withdrawal-reverse',
  templateUrl: './withdrawal-reverse.component.html',
  styleUrls: ['./withdrawal-reverse.component.css']
})
export class WithdrawalReverseComponent implements OnInit {

  pendingWithdrawals = [];
  money: number;
  i: number;
  total = 0;

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
   this.pendingWithdrawals = this.bankService.getPendingTransactions();
   this.pendingWithdrawals.map( withdrawal => {
    return this.total += +withdrawal.amount;
   });
  }

  reverseWithdrawal(money: number, i: number): void {
    this.bankService.giveMoney(money, i);
  }
  completeReverse(): void {
    const mony = this.bankService.reverseWithdrawal;
    const index = this.bankService.index;
    this.bankService.depositMoney(+mony);
    this.pendingWithdrawals.splice( index, 1);
    // For better user experience
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/bet/success']);
    }, 800);
  }

  goDeposit(): void {
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/deposit']);
    }, 800);
  }
}
