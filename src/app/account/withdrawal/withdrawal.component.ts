import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { BankService } from 'src/app/bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  money: number;
  amount: number;

  constructor(private bankService: BankService, private router: Router) { }

  ngOnInit(): void {
    this.bankService.changedMoney.subscribe( money => {
      this.money = money;
    });
  }

  withdrawal(amount: number): void {
    this.bankService.withdrawalMoney(amount);
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/bet/success']);
    }, 800);
  }
}

