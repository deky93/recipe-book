import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 recipesChanged = new Subject<Recipe[]>();
  
  recipes1:Recipe[]= [
    
    {
      name:'sdfffdsffds',
      description:'fdfdssffdssfd',
      imagePath:'dasaddsads',
      ingredients:[
        new Ingredient('Paprika',100),
        new Ingredient('Luk',300),
        
      ]
      
      
    }
    
    
  ]
  

  // private recipes: Recipe[]=[
  //   new Recipe(
  //     'Recept 1',
  //   'Baklava s kokosom',
  //   'https://podravkaiovariations.azureedge.net/56e2a15c-6404-11eb-8249-0242ac12003c/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp',
  //   [
  //     new Ingredient('Vegeta',400),
  //     new Ingredient('Brasno',500),
  //   ]
  //   ),
  //    new Recipe('Recept 2',
  //   'Baklava s kokosom',
  //   'https://podravkaiovariations.azureedge.net/56e2a15c-6404-11eb-8249-0242ac12003c/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp',
  //   [
  //     new Ingredient('Buns',400),
  //     new Ingredient('Meet',500),
  //   ]
  //   )
    
  // ];

  private recipes:Recipe[] = [];

  constructor(private shoppingListService:ShoppingListService) {

   }

  getRecipes() {
    return this.recipes.slice();
    //return this.recipes1.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredient:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice())
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    console.log(this.recipes);
    this.recipesChanged.next(this.recipes.slice())
    console.log(this.recipes);
  }
}
