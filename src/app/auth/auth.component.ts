import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective;

  private closeSub:Subscription;

  isLoginMode = true;
  isLoading = false;
  error:string=null;
  

  constructor(private authService: AuthService,private router:Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
    
  }

  onSubmit(form:NgForm){
  
    console.log(this.isLoginMode);
    
    if (!form.valid) {
     
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs:Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      console.log('usao u login mod');
      authObs = this.authService.login(email,password);
      console.log(authObs);
      console.log(this.router);
      
    }
    else{
      //authObs = this.authService.signup(email, password);
      this.isLoading = false;
      this.router.navigate(['/auth']); 
    
    }

    authObs.subscribe((data) => {
     console.log('usao u authObs');
     
      console.log(data);
      

      this.router.navigate(['/recipes']);


      data.expiresIn = "20000"
      this.isLoading = false;
      
    },errorMessage =>{
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
      
    });

 


    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    if (this.closeSub) {
      console.log('usao u close Sub');
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message:string){
    //const alertCmp = new AlertComponent();
    //resolveComponentFactory(AlertComponent) -  it creates a factory for dynamically creating instances of the AlertComponent
    //viewContainerRef represents the location in the template where you can dynamically add components.
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    //holds a reference to the view container where the dynamically created component will be inserted
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

    //this code dynamically creates an instance of the AlertComponent, sets its message property, subscribes to its close event, and removes the component from the DOM when the close event is triggered
  }

 

}
