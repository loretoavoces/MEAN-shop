import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShellComponent } from './components/shell/shell.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CategoriesService } from './services/categories.service';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { UsersComponent } from './components/users/users.component';
import { DialogModule } from 'primeng/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { UsersModule } from './users.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersComponent,
    UserFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    EditorModule,
    DropdownModule,
    DialogModule,
    UsersModule
  ],
  providers: [CategoriesService, MessageService, ConfirmationService, Location, DialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }