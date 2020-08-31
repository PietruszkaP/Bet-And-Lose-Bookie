import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankService } from 'src/app/bank.service';

@Component({
  selector: 'app-show-bets',
  templateUrl: './show-bets.component.html',
  styleUrls: [ './show-bets.component.css'
  ]
})
export class ShowBetsComponent implements OnInit {

  betslip = [];
  @Input() gamesArray = [];
  @Input() title: string;
  @Input() imageSrc: string;

  constructor(private bank: BankService) { }

  ngOnInit(): void {
    this.bank.changedBetSlipArray.subscribe( betSlip => {
      this.betslip = betSlip;
    });
  }
 // Getting value of selected game //
  getValue(odd: string, home: string, away: string, type: string, i: number, position: string, game: any): void {
    const id = i + position;
    const bet = {home, away, type, odd, id};
    // tslint:disable-next-line:no-shadowed-variable
    const check = this.bank.BetSlip.findIndex( bet => {
    return bet.home === home;
   });
    if (check === -1) {
     this.bank.addToBetSlip(bet);
   }
  }
}
