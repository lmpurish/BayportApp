import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ComponentComponent } from '../Manage/component/component.component';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  
},
{
  path: "component",
  component: ComponentComponent
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
