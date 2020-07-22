import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() product: any;
  @Output() productRemoved = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  modelChanged(product) {
    if (this.product.num === 0){
      this.productRemoved.emit(this.product);
    }
  }
}
