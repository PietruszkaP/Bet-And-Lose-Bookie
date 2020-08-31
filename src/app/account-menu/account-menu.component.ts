import { Component, OnInit } from '@angular/core';
import { BankService } from './../bank.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  openBetsArray: number;
  money: number;
  name: string;
  open = false;
  user: User;
  myAccount = false;


  constructor(private bank: BankService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.bank.changedMoney.subscribe(money => {
      this.money = money;
    });
    this.openBetsArray = this.bank.getOpenBets().length;
    this.bank.openLength.subscribe( num => {
      this.openBetsArray = num;
    });
  }


  showDiv(): void{
    this.open = !this.open;
    this.myAccount = false;
    this.user = this.auth.getUser();
  }

  onLogOut(): void {
    this.open = false;
    this.auth.user.next(null);
  }

  onDeposit(): void {
    this.open = false;
    this.myAccount = false;
    this.router.navigate(['/account/deposit']);
  }
  gamblingControls(): void {
    this.open = false;
    this.router.navigate(['/control/spending']);
  }
  onWithdraw(): void {
    this.open = false;
    this.router.navigate(['/account/withdrawal']);
  }
  openBets(): void {
    this.open = false;
    this.myAccount = false;
    this.router.navigate(['/account/open']);
  }
  createBet(): void {
    this.open = false;
    this.router.navigate(['/account/bet']);

  }
  reverseWithdrawal(): void {
    this.open = false;
    this.router.navigate(['/account/withdrawal-reverse']);
  }
  contact(): void {
    this.open = false;
    this.router.navigate(['/control/contact']);
  }
  balanceTransfer(): void {
    this.open = false;
    this.router.navigate(['/account/balance-transfer']);
  }
  settedBets(): void {
    this.open = false;
    this.router.navigate(['/account/setted']);
  }
  goToMyaccount(): void {
    this.open = false;
    this.myAccount = true;
  }
}
