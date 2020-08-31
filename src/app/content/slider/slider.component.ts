import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  mouseover = true;
  number = -100;
  left: any;
  active = 0;
  imageSrc = '../../../assets/slider1.jpg';
  sliderAray = [
    {src: '../../../assets/slider1.jpg'},
    {src: '../../../assets/slider2.jpg'},
    {src: '../../../assets/slider3.jpg'}
];

  constructor() { }

  ngOnInit(): void {
    this.interval();
  }

  mouseIn(): void {
   this.mouseover = false;
  }
  mouseOut(): void {
   this.mouseover = true;
  }
  interval(): void {
     setInterval( () => {
        if (this.number > 0){
          this.number = -100;
          this.left = `-100%`;
          if (this.active === 2) {
              return this.active = 0;
            }
          this.active += 1;
        }
        if ( this.mouseover) {
          this.number += 0.4;
          this.left = `${this.number}%`;
        }
          } , 40);
      }
 }


