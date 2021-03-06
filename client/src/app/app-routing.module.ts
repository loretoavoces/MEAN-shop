import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ShellComponent } from './components/shell/shell.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGardService } from './services/auth-gard.service';

const routes: Routes = [
    {
    path: '', component: ShellComponent, canActivate: [AuthGardService], children: [
      {
        path: '', component: DashboardComponent
        },
        {
        path: 'categories', component: CategoriesComponent
        },
        {
        path: 'categories/form', component: CategoriesFormComponent
        },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
        {
        path: 'categories/form/:id', component: CategoriesFormComponent
        },
        {
          path: 'users',
          component: UsersComponent
        },
        {
          path: 'users/form',
          component: UserFormComponent
        },
        {
          path: 'users/form/:id',
          component: UserFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
