import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode= false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startedEditing.subscribe(
      (index:number) => {
        console.log(index);
        
        this.editedItemIndex= index;
        this.editMode= true;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        console.log(this.editedItem);
        
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
        console.log(this.slForm);
        
      }
    );
    console.log(this.subscription);

  }

  onAddItem(form:NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name,value.amount);
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex,newIngredient)
    }
    else{
      this.shoppinglistService.addIngredient(newIngredient); 
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.editMode = false;
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
