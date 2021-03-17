import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TestComponent } from './component/test/test.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { PropertyComponent } from './component/property/property.component';
import { UserAdminComponent } from './component/user-admin/user-admin.component';
import { UserService } from './service/user.service';
import { PrimengModule } from './primeng.module';
import { PropertyService } from './service/property.service';
import { UnitComponent } from './component/unit/unit.component';
import { UnitService } from './service/unit.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    MainComponent,
    PropertyComponent,
    UserAdminComponent,
    UnitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    ConfirmationService,
    MessageService,
    PropertyService,
    UnitService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
