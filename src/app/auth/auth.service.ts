import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { BankService } from 'src/app/bank.service';

export interface AuthResponseData{
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    email: string;
    password: string;
    usedEmails = [];
    user = new BehaviorSubject<User>(null);
    changedUser: User;

  constructor(private http: HttpClient, private router: Router, private bankService: BankService) { }

  getUser(): User {
    return this.changedUser;
  }
  // Get details of user
  getDetails(form: NgForm): void{
      this.email = form.value.email;
      this.password = form.value.password;
      this.usedEmails.push(this.email);
  }

  singUP(): void {
    this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5OzB-TMXNeMuBElYd23Q4k4UopvbPcQ4' , {
      email: this.email,
      password: this.password,
      returnSecureToken: true,
    }).pipe(
      tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn,
        );
      })
    ).subscribe( data => {
      console.log(data);
      this.router.navigate(['/loading']);
      setTimeout( () => {
        this.router.navigate(['/account']);
      }, 800);
    }, error => {
      console.log(error);
      this.router.navigate(['/loading']);
      setTimeout( () => {
        this.router.navigate(['/register/step3/error']);
      }, 800);
    });
  }

  logIn(email: string, password: string): Observable<AuthResponseData> {
   this.bankService.fetchData();
   return this.http.post<AuthResponseData>
   ( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5OzB-TMXNeMuBElYd23Q4k4UopvbPcQ4',
    {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn,
        );
      }
    ));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.changedUser = user;
  }

}

