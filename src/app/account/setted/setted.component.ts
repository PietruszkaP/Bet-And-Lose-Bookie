import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';


@Component({
  selector: 'app-setted',
  templateUrl: './setted.component.html',
  styleUrls: ['./setted.component.css']
})
export class SettedComponent implements OnInit {

  wonBets = [];
  lostBets = [];
  display = false;
  field = {
    data: '24hours',
  };
  titleWon: string;
  selectedWon: number;
  select = `select${this.selectedWon}`;
  openWon = true;
  clickedWon = false;
  activeWon = false;
  titleLose: string;
  selectedLose: number;
  openLose = false;
  clickedLose = false;
  activeLose = false;
  spiner = false;
  now = Math.round(new Date().getTime());
  yesterday = this.now - (24 * 60 * 60 * 1000);
  sevenDays = this.now - (7 * 24 * 60 * 60 * 1000);
  // U NEED TO CHANGE THAT NOW IS LONGER THEN 24
  twentyFourDays = this.now - ( 240 * 24 * 60 * 60 * 1000);

  constructor( private store: Store<fromApp.AppState>) { }

  // Initial we share Lost Bets and Won Bets in last 24 hours
  ngOnInit(): void {
    this.checkCorrectDate(this.yesterday);
    this.getArrays();
  }
  getArrays(): void {
    this.store.select('bank').pipe( bankState => {
      return bankState;
    }
    ).subscribe( bankState => {
      // bankState.WonBets.map( array => {
      //   this.wonBets.push(array);
      // });
      this.wonBets = bankState.WonBets;
      this.lostBets = bankState.LostBets;
      // bankState.LostBets.map( array => {
      //   this.lostBets = [{...array}];
      // });
      });
  }

  viewLastBets(): void {
    if (this.lostBets.length === 0 && this.wonBets.length === 0) {
      this.display = true;
    }
    if (this.field.data === '7days') {
      this.spinner();
      this.checkCorrectDate(this.sevenDays);
      }
    if (this.field.data === '24hours') {
      this.spinner();
      this.checkCorrectDate(this.yesterday);
    }
    if (this.field.data === '24days') {
      this.spinner();
      this.checkCorrectDate(this.twentyFourDays);
    }
  }
  // Spinner for better user experience :) //
  spinner(): void{
    this.spiner = true;
    setTimeout( () => {
      this.spiner = false;
    }, 500);
    this.lostBets = [];
    this.wonBets = [];
    this.getArrays();
  }
  // Last 24 hours or Last 7 days or last 24 days
  checkCorrectDate(date: number): void {
    this.lostBets = this.lostBets.filter( bet => {
      return bet.date > date;
      });
    this.wonBets = this.wonBets.filter( bet => {
      return bet.date > date;
      });
    this.wonBets = this.wonBets.sort(this.compareDate);
    this.lostBets = this.lostBets.sort(this.compareDate);
  }

    // Array responasble for sort elements in arrays
    compareDate(a, b): number {
    return b.date - a.date;
}


  // Method close Lost Array opened element
  lost(index: number, toogle: string, title: string): void{
    this.selectedLose = index;
    this.titleLose = title;
    if (toogle === 'true') {
        this.select = 'select[i]';
        this.openLose = true;
        this.clickedLose = true;
        this.activeLose = true;
      }
    if (toogle === 'false') {
        this.openLose = false;
        this.clickedLose = false;
      }
  }
  // Method which close opened element in won Bets Array
  close(index: number, toogle: string, title: string): void {
    this.selectedWon = index;
    this.titleWon = title;
    if (toogle === 'true') {
        this.select = 'select[i]';
        this.openWon = true;
        this.clickedWon = true;
        this.activeWon = true;
      }
    if (toogle === 'false') {
        this.openWon = false;
        this.clickedWon = false;
      }


  }
}
