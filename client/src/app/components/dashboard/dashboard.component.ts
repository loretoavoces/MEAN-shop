import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/products';
import { Users } from 'src/app/models/users';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  categories: Category[];
  users: Users[];

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getUsers();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => this.products = res)
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(res => this.categories = res)
  }

  getUsers() {
    this.usersService.getUsers().subscribe(res => this.users = res)
  }

}