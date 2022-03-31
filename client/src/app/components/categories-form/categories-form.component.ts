import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false;
  editMode = false;

  constructor(private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder, private categoriesService: CategoriesService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
    })
    this.checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
    const data = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
    }
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.categoriesService.updateCategory(params.id, data).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category changed' });
        this.location.back();
      });
    } else {
      this.categoriesService.postCategories(data).toPromise();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category created' });
      this.location.back();
    }
  }

  get categoryForm() {
    return this.form.controls;
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true
        this.categoriesService.getCategory(params.id).subscribe(res => {
          this.categoryForm.name.setValue(res.name)
          this.categoryForm.icon.setValue(res.icon)
        });
      };
    })
  }

}
