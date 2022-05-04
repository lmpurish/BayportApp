import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../layouts/login/login/login.component';
import { ComponentComponent } from '../Manage/component/component.component';
import { CustomerComponent } from '../Manage/customer/customer.component';
import { ProductComponent } from '../Manage/product/product.component';
import { ProjectComponent } from '../Manage/project/project.component';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate : [AuthGuardService]
},
{
  path: "components",
  component: ComponentComponent,
  canActivate : [AuthGuardService]
},
{
  path: "customers",
  component: CustomerComponent,
  canActivate : [AuthGuardService]
},
{
  path: 'projects',
  component: ProjectComponent,
  canActivate : [AuthGuardService]
},
{
  path: 'products',
  component: ProductComponent,
  canActivate : [AuthGuardService]
},
{
  path: 'login',
  component: LoginComponent
}


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
