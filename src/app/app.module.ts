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
import { BulkUnitComponent } from './component/bulk-unit/bulk-unit.component';
import { TenantComponent } from './component/tenant/tenant.component';
import { TenantFormComponent } from './component/forms/tenant-form/tenant-form.component';
import { TenantService } from './service/tenant.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    MainComponent,
    PropertyComponent,
    UserAdminComponent,
    UnitComponent,
    BulkUnitComponent,
    TenantComponent,
    TenantFormComponent,
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
    TenantService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
