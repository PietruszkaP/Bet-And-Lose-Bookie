import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;
  message: string;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(f: NgForm): void {
    if (f.valid){
      this.auth.logIn(f.value.email, f.value.password).
      subscribe( data => {
        console.log(data);
        this.router.navigate(['/loading']);
        setTimeout( () => {
          this.router.navigate(['/account/football']);
        }, 800);
        }, error => {
            this.error = true;
            this.message = error.error.error.message;
            f.reset({
              email: f.value.email,
              password: '',
            });
          });
        }
}

}
