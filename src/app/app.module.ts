import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { MaterialModule } from '../app/material/material/material.module';
import { JwtModule } from '@auth0/angular-jwt';

import { CommonModule } from '@angular/common';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ComponentComponent } from './Manage/component/component.component';
import { NewComponentComponent } from './Manage/component/new-component/new-component.component';
import { ComponentServiceService } from './services/component-service.service';
import { HttpClientModule } from '@angular/common/http';

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
import { LoginComponent } from './layouts/login/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserComponent } from './layouts/user/user.component';
import { RegisterComponent } from './layouts/user/register/register.component';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileService } from './services/upload-file.service';



export function tokenGetter(){
  return localStorage.getItem("jwt");
}





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DefaultComponent,
    DashboardComponent,
    ComponentComponent,
    NewComponentComponent,
    ComponentDetailComponent,
    CustomerComponent,
    NewCustomnerComponent,
    ProductComponent,
    ProjectComponent,
    MatConfirmDialogComponent,
    NewProjectComponent,
    NewProductComponent,
    MoventComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44357"],
        disallowedRoutes: []
      }
    }),
    MaterialModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    
  ],
  providers: [ComponentServiceService, PositionService, AuthGuardService, UploadFileService],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
