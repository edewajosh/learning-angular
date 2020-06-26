import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/app-state.model';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ShoppingItem } from './models/shopping-item.module';
import { AddItemAction, DeleteItemAction } from './actions/shopping.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingItems$: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = {id: '', name: ''};

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems$= this.store.select(store => store.shopping);
  }

  addItem(){
    this.newShoppingItem.id = uuidv4();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = {id:'', name:''};
  }

  deleteItem(id: string){
    this.store.dispatch(new DeleteItemAction(id));
  }
}
