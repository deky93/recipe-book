import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub:Subscription;
  //The dollar sign ($) in isAuthenticated$ indicates that it's an Observable.
  //isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private dataStorage:DataStorageService,private authService: AuthService,private router:Router,private authGourd: AuthGuard) { }

  ngOnInit(): void {
    this.userIsAuthenticated();
  }

  userIsAuthenticated() {
        this.userSub = this.authService.user.subscribe(user => {
          console.log(user);
          
          this.isAuthenticated = !user ? false:true;
          console.log(this.isAuthenticated);
          
        });
    
        if (!this.userSub) {
          this.authService.user.next(null); 
          console.log(this.authService.user);
          
        }
  }

  // ngDoCheck(): void {
  //  this.getIsAuthenticated();
  // }

  

  // isUserAuthenticated(): boolean {
  //   return this.isAuthenticated;
  // }

  onSaveRecipes(){
    this.dataStorage.storeRecipes();
  }

  onFetchRecipes(){
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogOut(){
    //localStorage.setItem('isAuthenticated', 'false');
    //localStorage.removeItem('userData');
    this.authService.logout();
    this.router.navigate(['/auth']);
    localStorage.setItem('userData',"null");
  }

  ngOnDestroy(){
    console.log('usao header ngOnDestroy');
    
    this.userSub.unsubscribe();
  }

}
