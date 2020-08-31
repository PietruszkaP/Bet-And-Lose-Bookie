import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BankService } from 'src/app/bank.service';


@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  betSlip = [];
  open = false;

  constructor(private router: Router, private bank: BankService, private location: Location) { }

  ngOnInit(): void {
    this.bank.changedBetSlipArray.subscribe( betSlip => {
      this.betSlip = betSlip;
      if (betSlip) {
        this.open = true;
      }
    });
  }

  openBetSlip(): void {
    this.open = !this.open;
  }
  // Method clear BetSlip Array in service and refresh component
  clearBetslip(): void {
    this.bank.clearBetSlip();
    setTimeout( () => {
      this.router.navigateByUrl('/refresh', { skipLocationChange: true}).then( () => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
    }, 10);
  }

  // Method delete selected bet
  delete(index: number): void {
    this.betSlip.splice(index, 1);
  }
}
