
import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate( route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
     | boolean
     | UrlTree
     | Promise<boolean | UrlTree>
     | Observable<boolean | UrlTree> {
       return this.store.select('auth').pipe(
         map(authState => {
           return authState.user;
         }),
         map( user => {
           const isAuth = !!user;
           if (isAuth) {
             return true;
           }
           return this.router.createUrlTree(['/home']);
         })
       );
     }

}
