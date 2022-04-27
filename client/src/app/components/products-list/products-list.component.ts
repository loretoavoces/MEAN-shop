import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  constructor(private router: Router, private productsService: ProductsService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => this.products = res)
  }

  deleteProduct(product: string) {
    this.confirmationService.confirm({
      message: 'Are you sure do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.removeProduct(product).subscribe(res => {
          this.getProducts();
        });
      },
      reject: () => { }
    });
  }

  editProduct(product: string) {
    this.router.navigateByUrl(`products/form/${product}`)    
  }

}
