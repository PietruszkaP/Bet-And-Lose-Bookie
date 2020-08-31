import { Component, OnInit } from '@angular/core';
import { BankService } from 'src/app/bank.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  title = 'Debit Card';

  constructor(private bankServie: BankService, private router: Router) { }

  ngOnInit(): void {
  }
  addTitle(title: string): void {
  this.title = title;
  }

  deposit(form: NgForm): void {
  const money = form.value.amount;
  this.bankServie.depositMoney(+money);
  // Router direct first fo Loading spinner then dislay alert Success
  this.router.navigate(['/loading']);
  setTimeout( () => {
    this.router.navigate(['/account/bet/success']);
  }, 1000);
  form.reset();
  }

}
