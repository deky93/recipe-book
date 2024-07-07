import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      //we always take latest user value and then unsubscribe for this gourd execution so we do not have on going user subscription
      take(1),
      map(user => {
      console.log(user);
      
      //Applying ! twice will negate the negation, effectively converting the value to a boolean.
      const isAuth = !!user;
      console.log(isAuth);
      
      if (isAuth) {
        //localStorage.setItem('isAuthenticated','true');
        return true;
      }
      else{
        this.authService.user.next(null);
        localStorage.setItem('userData','null');
        //localStorage.setItem('isAuthenticated','false');
        return this.router.createUrlTree(['/auth']);

      }
    })
    );
  }
  
}
