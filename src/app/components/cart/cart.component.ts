import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() products: any[];
  @Output() productRemoved = new EventEmitter();
  total(){
    return this.products.reduce((sum, prod) => sum += prod.num, 0);
  }
  constructor() { }

  ngOnInit(): void {
  }

  removeProduct(product) {
    this.productRemoved.emit(product);
  }
}
