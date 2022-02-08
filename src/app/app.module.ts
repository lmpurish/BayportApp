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
    ComponentComponent,
    PositionsComponent,
  ],
  providers: [ComponentServiceService, PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
