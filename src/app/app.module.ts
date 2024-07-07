import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


//multiple declarations in modules are not allowed

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    //ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer})
  ],
  //ShoppingListService and RecipeService in providers are optional becouse @Injectable({providedIn: 'root'}) means that service is provided application wide
  //only declarations and modules need to be exported,services are automaticly injected on root level so there is no need to export them
  providers: [
    //ShoppingListService,RecipeService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
