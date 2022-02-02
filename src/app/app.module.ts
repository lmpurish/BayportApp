import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule} from '../app/app-routing/app-routing.module';
import { MaterialModule } from '../app/material/material/material.module';
import { MainNavComponent } from '../app/common/main-nav/main-nav.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ComponentComponent } from './Manage/component/component.component';

@NgModule({
  declarations: [
    AppComponent,
    
    MainNavComponent,
         FooterComponent,
         HeaderComponent,
         SidebarComponent,
         DefaultComponent,
         ComponentComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    CommonModule,
    
    
    

  ],
  exports: [
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
