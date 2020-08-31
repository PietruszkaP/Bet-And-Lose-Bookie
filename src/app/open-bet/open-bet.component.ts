import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankService } from './../bank.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-open-bet',
  templateUrl: './open-bet.component.html',
  styleUrls: ['./open-bet.component.css']
})
export class OpenBetComponent implements OnInit {



@Input() bets: any;
@Output() loses = new EventEmitter<void>();
@Output() won = new EventEmitter<void>();

  constructor(private bank: BankService, private router: Router) { }

  ngOnInit(): void {
  }
  toLostBets(): void {
    this.loses.emit();
    this.router.navigate(['/account/setted']);
  }

  toWonBets(): void {
    this.won.emit();
    this.router.navigate(['/account/setted']);
  }

}
