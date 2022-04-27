import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const userRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
]
    
@NgModule({
  imports: [RouterModule.forRoot(userRoutes)],
  exports: [RouterModule]
})
export class UsersModule { }