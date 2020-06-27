import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, EffectsRootModule } from '@ngrx/effects';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemSuccessAction, AddItemAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction, UpdateItemAction, UpdateItemASuccessAction, UpdateItemFailureAction } from '../actions/shopping.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ShoppingService } from 'src/app/shopping.service';
import { of } from 'rxjs';

@Injectable()
export class ShoppingEffects {
    

    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItems()
                .pipe(
                    map(data => {
                        return new LoadShoppingSuccessAction(data)
                    }),
                    catchError(error => of(new LoadShoppingFailureAction(error)))
                )
            ),
        )

    @Effect() addShoppingItem$ = this.actions$
    .pipe(
      ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
      mergeMap(
        (data) => this.shoppingService.addShoppingItem(data.payload)
          .pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )
      )
  )
  
    @Effect() deleteShoppingItem$ = this.actions$
        .pipe(
        ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
        mergeMap(
            (data) => this.shoppingService.deleteShoppingItem(data.payload)
            .pipe(
                map(() => new DeleteItemSuccessAction(data.payload)),
                catchError(error => of(new DeleteItemFailureAction(error)))
            )
        )
    )
    
    
    @Effect() updateShoppingItem$ = this.actions$
        .pipe (
        ofType<UpdateItemAction>(ShoppingActionTypes.UPDATE_ITEM),
        mergeMap(
            (data) => this.shoppingService.updateShoppingItem(data.payload)
            .pipe(
                map(() => new UpdateItemASuccessAction(data.payload)),
                catchError(error => of(new UpdateItemFailureAction(error)))
            )
        )
    )

    constructor(private actions$: Actions, private shoppingService: ShoppingService){}

}