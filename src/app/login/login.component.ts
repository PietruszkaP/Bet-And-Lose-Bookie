import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;
  message: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {}


  // LOGIN WITH NGRX
  login(f: NgForm): void {
    if (f.valid){
      const email = f.value.email;
      const password = f.value.password;
      this.store.dispatch(new AuthActions.LoginStart({email, password}));

      this.store.select('auth').subscribe( authState => {
        if (authState.authError) {
          this.error = true;
          this.message = authState.authError;
          f.reset({
            email: f.value.email,
            password: '',
          });
        } else {
          this.error = false;
        }
      });
        }
}

}
