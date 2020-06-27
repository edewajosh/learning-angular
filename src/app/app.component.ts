import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { FormBuilder, FormGroup, NgForm } from '@angular/forms'

import { ShoppingItem } from './store/models/shopping-item.module';
import { AddItemAction, DeleteItemAction, LoadShoppingAction, UpdateItemAction } from './store/actions/shopping.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingItems: Observable<Array<ShoppingItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = {id: '', name: ''};
  
  itemToBeUpdated: ShoppingItem;
  isUpdateActivated = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems = this.store.select(store => store.shopping.list);
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);
    
    this.store.dispatch(new LoadShoppingAction());
  }

  showUpdateForm(shoppingItem: ShoppingItem){
    this.itemToBeUpdated = { ...shoppingItem};
    this.isUpdateActivated = true;
    console.log(shoppingItem);
  }
  addItem(){
    this.newShoppingItem.id = uuidv4();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = {id:'', name:''};
  }

  updateItem(updateForm){
    console.log(updateForm.value.name);
    this.newShoppingItem.id = this.itemToBeUpdated.id;
    this.newShoppingItem.name = updateForm.value.name;
    this.store.dispatch(new UpdateItemAction(this.newShoppingItem));

    this.newShoppingItem = {id:'', name:''};

    this.isUpdateActivated = true;
  }
  deleteItem(id: string){
    this.store.dispatch(new DeleteItemAction(id));
  }

  
}
