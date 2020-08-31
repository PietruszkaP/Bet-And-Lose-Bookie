import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styles: [
  ]
})
export class BasketballComponent implements OnInit {

  basketballAray = [
    {homeTeam: 'Chicago Bulls', awayTeam: 'Orlando Magic', win: '1.20', lose: '3.80', over: '1.85', under: '1.70', points: '146.5'},
    {homeTeam: 'Los Angeles Clipers', awayTeam: 'Toronto Raptors', win: '2.20', lose: '1.80', over: '1.55', under: '2.10', points: '146.5'},
    {homeTeam: 'Denver Nuggets', awayTeam: 'Los Angeles Lakers', win: '1.60', lose: '2.20', over: '1.85', under: '1.80', points: '126.5'},
    {homeTeam: 'Miami Heat', awayTeam: 'Golden State Warriors', win: '2.40', lose: '1.40', over: '1.65', under: '1.90', points: '126.5'},
    {homeTeam: 'Phenix Suns', awayTeam: 'Cleveland Cavaliers', win: '1.20', lose: '3.80', over: '1.85', under: '1.70', points: '146.5'},
    {homeTeam: 'Indiana Pacers', awayTeam: 'Brooklyn Nets', win: '2.20', lose: '1.80', over: '1.55', under: '2.10', points: '146.5'},

  ];
  image = './../../../assets/NBA.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
