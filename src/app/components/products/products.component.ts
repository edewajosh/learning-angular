import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []

  constructor(
    private productService: BackendService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) =>{
      console.log(data);
      this.products = data;
    })
  }

}
