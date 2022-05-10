import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  
  form!: FormGroup;
  isSubmitted: boolean = false;
  editMode = false;
  catagories: Category[] = [];
  imageDisplay: any;
  currentProductId!: string;
  file: File;
  shortLink: string = "";

  constructor(private productsService: ProductsService, private location: Location, private route: ActivatedRoute, private formBuilder: FormBuilder, private categoriesService: CategoriesService,  private messageService: MessageService) {}

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
    this.checkEditMode();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      isFeatured: [false],
      rating: [''],
      numReviews: [''],
      dateCreated: [''],
      id: [''],
      image: [''],
      images: [''],
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(res => this.catagories = res)
  }

  get productForm() {
    return this.form.controls;
  }

  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.form.patchValue({
        image: this.file
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created' });
    const data = {
      name: this.productForm.name.value,
      brand: this.productForm.brand.value,
      price: this.productForm.price.value,
      category: this.productForm.category.value,
      countInStock: this.productForm.countInStock.value,
      description: this.productForm.description.value,
      richDescription: this.productForm.richDescription.value,
      isFeatured: this.productForm.isFeatured.value,
      rating: this.productForm.rating.value,
      numReviews: this.productForm.numReviews.value,
      dateCreated: this.productForm.dateCreated.value,
      image: this.productForm.image.value,
      images: this.productForm.images.value,
    }
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.productsService.updateProduct(params.id, data).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category changed' });
        this.location.back();
      });
    } else {
      this.productsService.postCategories(data).toPromise();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category created' });
      this.location.back();
    }
    
  }

  checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category?.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }

}
