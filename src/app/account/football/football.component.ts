import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from './../../bank.service';



@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: [ './football.component.css']
})
export class FootballComponent implements OnInit {

  open = true;
  betslip = [];
  length: number;

  premierLeague = [
       {homeTeam: 'Crystal Palace', awayTeam: 'Southampton', win: '2.20', draw: '3.20', lose: '1.80', over: '1.85', under: '1.60'},
       {homeTeam: 'Fulham', awayTeam: 'Arsenal', win: '3.20', draw: '2.20', lose: '1.40', over: '1.65', under: '1.95'},
       {homeTeam: 'Liverpool', awayTeam: 'Leeds', win: '1.20', draw: '4.20', lose: '7.80', over: '1.45', under: '2.60'},
       {homeTeam: 'Tottenham Hotspur', awayTeam: 'Everton', win: '1.70', draw: '3.20', lose: '4.80', over: '1.85', under: '1.75'},
       {homeTeam: 'West Bromwich', awayTeam: 'Leicester', win: '2.20', draw: '3.20', lose: '1.80', over: '1.85', under: '1.60'},
       {homeTeam: 'Manchester United', awayTeam: 'Aston Villa', win: '1.40', draw: '3.20', lose: '5.80', over: '1.85', under: '2.60'},
       {homeTeam: 'Newcastle United', awayTeam: 'Manchester City', win: '5.20', draw: '4.20', lose: '1.30', over: '1.55', under: '2.60'},
       {homeTeam: 'Chelsea', awayTeam: 'Brighton and Hove Albion', win: '1.45', draw: '4.20', lose: '5.80', over: '1.85', under: '1.75'},
  ];

  constructor(private router: Router, private bank: BankService) { }


  ngOnInit(): void{
    this.bank.changedBetSlipArray.subscribe( betSlip => {
      this.betslip = betSlip;
      if ( betSlip) {
        this.open = false;
      }
    });
  }
  // Getting value of selected game
  getValue(odd: string, home: string, away: string, type: string, i: number, position: string): void {
    this.open = true;
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
