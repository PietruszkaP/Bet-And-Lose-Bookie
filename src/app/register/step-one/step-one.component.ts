import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {

  usedEmails = [];
  usedEmail;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usedEmails = this.auth.usedEmails;
  }

  check(emailo: string): void {
  const email = this.usedEmails.filter( email => email === emailo);
  if (email.length === 1) {
     this.usedEmail = true;
   } else {
     this.usedEmail = false;
   }
}

  submitForm(form: NgForm): void{
    this.auth.getDetails(form);
    setTimeout( () => {
      this.router.navigate(['/register/step2']);
    }, 10);
  }
}



