import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registred?:boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;
  

  constructor(private http: HttpClient,private router:Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        })
      );
  }

  login(email: string, password: string) {
    console.log(email);
    console.log(password);
    
    
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
      }));
  }

  autoLogin(){
    console.log('usao auto login');
    
    const userData:{
      email:string,
      id:string,
      _token:string;
      _tokenExperationDate:string;
    } = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    
    if (!userData) {
     
      return
    }

    const loadedUser = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExperationDate))

    console.log(loadedUser);
    

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExperationDate).getTime() - new Date().getTime();
     
      
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    //localStorage.clear(); // Removes all items from localStorage
    if (this.tokenExpirationTimer) {
      console.log(this.tokenExpirationTimer);
      
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration:number){
   
    
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration
    )
  }

  private handleAuthentication(
    email: string,
    userId:string,
    token: string,
    expiresIn: number
  ) {
    //secundes         convert in milisecundes
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
   
    this.user.next(user);
    
    
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log('usao u handle error');
    
    console.log(errorRes);

    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Email or password are not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
