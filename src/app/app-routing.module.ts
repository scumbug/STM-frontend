import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { BulkUnitComponent } from './component/bulk-unit/bulk-unit.component';
import { LandingComponent } from './component/landing/landing.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { PropertyComponent } from './component/property/property.component';
import { TenantComponent } from './component/tenant/tenant.component';
import { TestComponent } from './component/test/test.component';
import { UnitComponent } from './component/unit/unit.component';
import { UserAdminComponent } from './component/user-admin/user-admin.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {
    path: 'users',
    component: TestComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER'],
    },
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER', 'ROLE_SALES', 'ROLE_ADMIN', 'ROLE_TENANT'],
    },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'property',
    component: PropertyComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER', 'ROLE_ADMIN'],
    },
  },
  {
    path: 'user-admin',
    component: UserAdminComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER'],
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER'],
    },
  },
  {
    path: 'property/:propertyId/unit',
    component: UnitComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER', 'ROLE_ADMIN'],
    },
  },
  {
    path: 'bulk-unit',
    component: BulkUnitComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER', 'ROLE_ADMIN'],
    },
  },
  {
    path: 'tenant',
    component: TenantComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER', 'ROLE_SALES'],
    },
  },
  {
    path: '',
    component: LandingComponent,
    canActivate: [AuthService],
    data: {
      role: ['ROLE_SUPER', 'ROLE_SALES', 'ROLE_ADMIN', 'ROLE_TENANT'],
    },
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
