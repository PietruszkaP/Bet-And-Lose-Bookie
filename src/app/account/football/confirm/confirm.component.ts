import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BankService } from 'src/app/bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  money = 0;
  return = 1;
  betslip = [];
  stake: number;

  constructor(private bank: BankService, private router: Router) { }

  ngOnInit(): void {
    this.bank.changedBetSlipArray.subscribe( betSlip => {
      this.betslip = betSlip;
      });
    this.bank.changedMoney.subscribe( money => {
      this.money = money;
    });
  }

  mouseOver(): void {
    this.return = 1;
    this.betslip.map( bet => {
      this.return = (this.return * bet.odd);
    });
  }
  // Method wchih add new Bet to service from Footbal Voleyball nad Basketball component
  onSubmit(stake: number): void {
    if ( stake > this.money) {
      return alert('You dont have enough credit !!! ');
    }

    const finalStake = +stake * this.return;
    const bets = [];
    this.betslip.map( bet => {
      const game = bet.home + ' - ' + bet.away;
      bets.push({ game, odd: bet.odd });
    });
    this.bank.addOpenBet([...bets], stake , finalStake.toFixed(2), this.return);
    this.router.navigate(['/account/open']);
    this.bank.clearBetSlip();
  }


}
