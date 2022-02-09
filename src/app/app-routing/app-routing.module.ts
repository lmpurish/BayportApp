import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ComponentComponent } from '../Manage/component/component.component';
import { CustomerComponent } from '../Manage/customer/customer.component';


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
