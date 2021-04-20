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
import { LandingComponent } from './component/landing/landing.component';
import { AdminComponent } from './component/admin/admin.component';
import { ConvertTenantFormComponent } from './component/forms/convert-tenant-form/convert-tenant-form.component';
import { PropertyFormComponent } from './component/forms/property-form/property-form.component';
import { EditUnitComponent } from './component/forms/edit-unit/edit-unit.component';
import { LeaseService } from './service/lease.service';
import { AmenitiesComponent } from './component/amenities/amenities.component';
import { AmenityService } from './service/amenity.service';
import { ScheduleService } from './service/schedule.service';
import { ScheduleAmenityComponent } from './component/forms/schedule-amenity/schedule-amenity.component';
import { TenantRequestAmenityComponent } from './component/tenant-request-amenity/tenant-request-amenity.component';
import { TenantPaymentComponent } from './component/tenant-payment/tenant-payment.component';
import { HistoricalRentComponent } from './component/visual/historical-rent/historical-rent.component';
import { PaymentService } from './service/payment.service';

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
    LandingComponent,
    AdminComponent,
    ConvertTenantFormComponent,
    PropertyFormComponent,
    EditUnitComponent,
    AmenitiesComponent,
    ScheduleAmenityComponent,
    TenantRequestAmenityComponent,
    TenantPaymentComponent,
    HistoricalRentComponent,
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
    LeaseService,
    AmenityService,
    ScheduleService,
    PaymentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
