import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { BankService } from 'src/app/bank.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isLogged = false;
  userSub: Subscription;

  constructor(private router: Router, private auth: AuthService,
              private bankService: BankService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe( user => {
      this.isLogged = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  direct(): void {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/register/step1']);
    }, 1000);
  }

  logout(): void {
    this.isLogged = false;
    this.router.navigate(['/']);
  }
  save(): void {
    this.http.delete('https://ng-complete-guide-e03f7.firebaseio.com/user-data.json').subscribe();
    this.bankService.storeInformation();
    this.router.navigate(['/loading']);
    setTimeout( () => {
      this.router.navigate(['/account/bet/success']);
    }, 2000);
  }
}


