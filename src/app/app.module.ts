import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule,Routes } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatNativeDateModule } from '@angular/material';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { TableComponent } from './components/table/table.component';
import { Vendor1Component } from './components/vendor1/vendor1.component';
import { Vendor2Component } from './components/vendor2/vendor2.component';
import { Vendor3Component } from './components/vendor3/vendor3.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vendor1', component: Vendor1Component },
  { path: 'vendor2', component: Vendor2Component },
  { path: 'vendor3', component: Vendor3Component },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ContentHeaderComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableComponent,
    Vendor1Component,
    Vendor2Component,
    Vendor3Component,
    SaveButtonComponent,
    DatePickerComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
