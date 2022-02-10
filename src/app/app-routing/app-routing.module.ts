import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ComponentComponent } from '../Manage/component/component.component';
import { CustomerComponent } from '../Manage/customer/customer.component';
import { ProductComponent } from '../Manage/product/product.component';
import { ProjectComponent } from '../Manage/project/project.component';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  
},
{
  path: "components",
  component: ComponentComponent
},
{
  path: "customers",
  component: CustomerComponent
},
{
  path: 'projects',
  component: ProjectComponent
},
{
  path: 'products',
  component: ProductComponent
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
