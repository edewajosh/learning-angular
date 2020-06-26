import { ShoppingItem } from "../models/shopping-item.module";
import { ShoppingAction, ShoppingActionTypes } from '../actions/shopping.action';

const initialState: Array<ShoppingItem> = [
    {
      id: "1775935f-36fd-467e-a667-09f95b917f6d",
      name: 'Diet Coke',
    },
    {
        id: "1775935f-36fd-489t-a667-09f95b917f6d",
        name: 'Sprite',
      }
  ];

  export function ShoppingReducer(state: Array<ShoppingItem> = initialState, action : ShoppingAction){
      switch(action.type) {
        case ShoppingActionTypes.ADD_ITEM:
            return[...state, action.payload];
        case ShoppingActionTypes.DELETE_ITEM:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
      }
  }