import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private router: Router, private confirmationService: ConfirmationService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategoies();
  }

  getCategoies() {
    this.categoriesService.getCategories().subscribe(res => this.categories = res)
  }

  deleteCategory(category: string) {
    this.confirmationService.confirm({
      message: 'Are you sure do you want to delete this category?',
      header: 'Deelte Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.removeCategory(category).subscribe(res => {
          this.getCategoies();
        });
      },
      reject: () => { }
    });
  }

  editCategory(category: string) {
    this.router.navigateByUrl(`categories/form/${category}`)
  }
}
