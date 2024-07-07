import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

 private ingredients:Ingredient[]=[
    new Ingredient('So',300),
    new Ingredient('Biber',1000)
  ];

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(index:number) {
    console.log(this.ingredients[index]);

    return this.ingredients[index];
    
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients:Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number,newIngredient:Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index){
    this.ingredients.splice(index,1);
    //this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() { }
}
