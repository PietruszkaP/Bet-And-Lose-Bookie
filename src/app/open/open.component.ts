import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BankService } from '../bank.service';
import { Bet } from './../Bet';
import { Coupon } from './../Coupon';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit {

  openBets = [];

  constructor(private location: Location, private bank: BankService) { }


  ngOnInit(): void {
      this.openBets = this.bank.getOpenBets().map( openBets => {
      return openBets;
    });
  }

  changeStyle(): any {
    if (this.openBets.length === 1 ) {
      return { 'justify-content' : 'flex-start'};
    }
    if (this.openBets.length === 4) {
      return { 'justify-content' : 'flex-start'};
    }
  }

  addToLoseBets(i: number): void {
    const lostBet = this.bank.openBets.filter( (bets, index) => {
      return index === i;
      });

    this.openBets = this.openBets.filter( (bets, index) => {
      return index !== i;
      });
    this.bank.openBets = this.openBets;
    this.bank.addLostBets(lostBet);
  }

addToWonBets(i: number): void {
  const wonBet = this.bank.openBets.filter( (bet, index) => {
    return index === i;
  });
  this.openBets = this.openBets.filter( (bet , index) => {
    return index !== i;
  });
  this.bank.openBets = this.openBets;
  this.bank.addWonBets(wonBet);
  }

}
