import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkUnitComponent } from './component/bulk-unit/bulk-unit.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { PropertyComponent } from './component/property/property.component';
import { TenantComponent } from './component/tenant/tenant.component';
import { TestComponent } from './component/test/test.component';
import { UnitComponent } from './component/unit/unit.component';
import { UserAdminComponent } from './component/user-admin/user-admin.component';

const routes: Routes = [
  { path: 'users', component: TestComponent },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'user-admin', component: UserAdminComponent },
  { path: 'property/:propertyId/unit', component: UnitComponent },
  { path: 'bulk-unit', component: BulkUnitComponent },
  { path: 'tenant', component: TenantComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
