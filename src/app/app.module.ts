import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule} from '../app/app-routing/app-routing.module';
import { MaterialModule } from '../app/material/material/material.module';

import { CommonModule } from '@angular/common';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ComponentComponent } from './Manage/component/component.component';
import { NewComponentComponent } from './Manage/component/new-component/new-component.component';
import { ComponentServiceService } from './services/component-service.service';
import { HttpClientModule } from '@angular/common/http';
import { PositionsComponent } from './manage/positions/positions.component';
import { PositionService } from './services/position.service';
import { ComponentDetailComponent } from './Manage/component/component-detail/component-detail.component';
import { CustomerComponent } from './Manage/customer/customer.component';
import { NewCustomnerComponent } from './Manage/customer/new-customner/new-customner.component';
import { ProductComponent } from './Manage/product/product.component';
import { ProjectComponent } from './Manage/project/project.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { NewProjectComponent } from './manage/project/new-project/new-project.component';
import { NewProductComponent } from './manage/product/new-product/new-product.component';
import { MoventComponent } from './layouts/movent/movent.component';






@NgModule({
  declarations: [
    AppComponent,
    
    
         FooterComponent,
         HeaderComponent,
         SidebarComponent,
         DefaultComponent,
         ComponentComponent,
         NewComponentComponent,
         PositionsComponent,
         ComponentDetailComponent,
         CustomerComponent,
         NewCustomnerComponent,
         ProductComponent,
         ProjectComponent,
         MatConfirmDialogComponent,
         NewProjectComponent,
         NewProductComponent,
         MoventComponent
      
         
         
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    
    
    

  ],
  exports: [
    
  ],
  providers: [ComponentServiceService, PositionService],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent]
})
export class AppModule { }
