import { ShoppingItem } from './shopping-item.module';

export interface AppState {
    readonly shopping: Array<ShoppingItem>
}