import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients:[
        new Ingredient('So',300),
        new Ingredient('Biber',1000)
      ]
}

export function shoppingListReducer(state = initialState,action:ShoppingListActions.AddIngredient){
    switch (action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return{
                ...state,
                Ingredients:[...state.ingredients,action]
            };
            default :
                return state;
    }
}