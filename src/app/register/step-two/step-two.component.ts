import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  direct(f: NgForm): void {
    if (f.valid) {
      this.router.navigate(['/register/step3']);
    }
  }
}
