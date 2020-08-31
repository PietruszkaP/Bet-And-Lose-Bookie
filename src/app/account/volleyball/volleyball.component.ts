import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-volleyball',
  templateUrl: './volleyball.component.html',
  styles: [
  ]
})
export class VolleyballComponent implements OnInit {

  voleyballAray = [
    {homeTeam: 'Padova', awayTeam: 'Perugia', win: '1.20', lose: '3.80', over: '1.85', under: '1.70', points: '146.5'},
    {homeTeam: 'Verona', awayTeam: 'Milano', win: '2.20', lose: '1.80', over: '1.55', under: '2.10', points: '146.5'},
    {homeTeam: 'Modena', awayTeam: 'Piacenza', win: '1.60', lose: '2.20', over: '1.85', under: '1.80', points: '126.5'},
    {homeTeam: 'Trentino', awayTeam: 'Monza', win: '2.40', lose: '1.40', over: '1.65', under: '1.90', points: '126.5'},
  ];
  image = './../../../assets/ITALY.png';

  constructor() { }

  ngOnInit(): void {
  }

}
