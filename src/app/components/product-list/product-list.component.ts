import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: any[];
  @Output() productAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addProductToCart(product){
    this.productAdded.emit(product);
  }
}
