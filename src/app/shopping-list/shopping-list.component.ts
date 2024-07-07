import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];

  private igChangeSub:Subscription;
  

  constructor(private recipeService: RecipeService,
    private shoppinglistService: ShoppingListService,
    private store:Store<{shoppingList: {ingredients: Ingredient[]}}>)
     { }

  ngOnInit(): void {
    this.store.select('shoppingList');
    this.ingredients=this.shoppinglistService.getIngredients();
    this.igChangeSub = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number) {
    this.shoppinglistService.startedEditing.next(index);
  }

}
