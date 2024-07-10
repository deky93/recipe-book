import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, filter, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipesService:RecipeService,private authService:AuthService) {}

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://recipe-book-course-proje-1976b-default-rtdb.firebaseio.com/recipes.json',{data : recipes}).subscribe((data) => {
      console.log(data);
      
    })
  }

  fetchRecipes(){
    return this.http.get('https://recipe-book-course-proje-1976b-default-rtdb.firebaseio.com/recipes.json',
   
    ).pipe(
      map((recipes:any) => {
        console.log(recipes);
        console.log(recipes.data);
        let recipes1 = recipes.data
       
          return recipes1.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        
      }),
      tap(recipes =>{
        console.log(recipes);
      
        this.recipesService.setRecipes(recipes);
      }
  
      )
    )
 
 
    
  }

  
}
