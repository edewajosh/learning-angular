import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CartComponent} from "./components/cart/cart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   productList = [
   {name: 'Z900', price: 8799},
   {name: 'shubert helmet', price: 999},
   {name: 'sport gloves', price: 99},
     {name: 'masks', price: 89},
   {name: 'Diapers', price: 59},
   {name: 'Tablets', price: 79}
  ];
 cartProductList = [];
 open = false;
 constructor(private modalService: NgbModal) {
 }

  addProductToCart(product) {
    const productExistInCart = this.cartProductList
      .find(({name}) => name === product.name); // find product by name
    if (!productExistInCart){
      this.cartProductList.push({...product, num: 1});
      // enhance "product" object with "num" property
      return;
    }
    productExistInCart.num += 1;
  }

  removeProduct(product) {
    this.cartProductList = this.cartProductList.filter(({name}) => name !== product.name)
  }

  openCart() {
    this.open = !this.open;
  }
}
