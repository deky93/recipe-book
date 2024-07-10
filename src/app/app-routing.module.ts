import { NgModule } from "@angular/core";
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from "@angular/router";




const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch:'full'},
    {path:'recipes', loadChildren:() => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path:'shopping-list', loadChildren:() => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path:'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
   
];

@NgModule({
  //velike module ucitati s preloadingStrategy odma a male ne
  
  //PreloadingStrategy interface

//   import { PreloadingStrategy, Route } from '@angular/router';
// import { Observable, of } from 'rxjs';

// export class CustomPreloadingStrategy implements PreloadingStrategy {
//   preload(route: Route, load: () => Observable<any>): Observable<any> {
//     // Your custom preloading logic here
//     // You can preload specific modules based on conditions or priorities
//     return load();
//   }
// }
// imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],


  imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})



export class AppRoutingModule {

}