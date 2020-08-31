import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from './../bank.service';
import { Bet } from '../Bet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrls: ['./create-bet.component.css']
})
export class CreateBetComponent implements OnInit {
  bets: Bet[] = [
  ];
  money: number;
  finalOdds = 1;
  score: number;
  @ViewChild('stake') read: ElementRef;
  stake: number;
  potentialReturn: number;
  title: string;

  constructor(private bank: BankService, private router: Router) { }

  ngOnInit(): void {
    this.money = this.bank.getMoney();
  }

  onAddBet(form: NgForm): void {
    const game = form.value.game;
    const odd = form.value.odd;
    const bet: Bet = {game, odd};
    this.finalOdds = 1;
    if (form.valid) {
     this.bets.push(bet);
     this.bets.map( bet => {
      return this.finalOdds = (this.finalOdds * bet.odd);
     });
     form.reset();
    }
    this.finalOdds = +this.finalOdds.toFixed(2);
  }

  placeBet(): void{
    this.stake = this.read.nativeElement.value;
    if (this.stake > this.bank.money ) {
      return alert('You dont have enough credit to bet');
    }
    this.potentialReturn = +(this.stake * this.finalOdds).toFixed(2);
    this.bank.addOpenBet([...this.bets], this.stake , this.potentialReturn, this.finalOdds.toFixed(2));
    this.bets = [];
    this.money = this.bank.getMoney();
    this.router.navigate(['/account/open']);
  }
}

