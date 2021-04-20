import { Component, OnInit } from '@angular/core';
import { Tenant, TenantStatus } from 'src/app/model/tenant.model';
import { TenantWrapper } from 'src/app/model/tenantwrapper.model';
import { User } from 'src/app/model/user.model';
import { TenantService } from 'src/app/service/tenant.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css'],
})
export class TenantComponent implements OnInit {
  convertTenantForm: boolean = false;
  tenant: Tenant;
  tenantForm: boolean = false;
  tenants: TenantWrapper[];

  constructor(
    private tenantService: TenantService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.tenantService
      .getTenants(TenantStatus.POTENTIAL)
      .then((res) => (this.tenants = res));
  }

  showConvertTenantForm(tenant) {
    this.tenant = tenant;
    this.convertTenantForm = true;
  }
  showTenantForm() {
    this.tenantForm = true;
  }

  onTenantFormClose(event) {
    this.tenantForm = event;
    this.tenantService
      .getTenants(TenantStatus.POTENTIAL)
      .then((res) => (this.tenants = res));
  }

  onConvertTenantFormClose(event) {
    this.convertTenantForm = event;
    this.tenantService
      .getTenants(TenantStatus.POTENTIAL)
      .then((res) => (this.tenants = res));
  }

  async convertTenant(wrapper) {
    await this.tenantService.convertTenant(wrapper.tenant.tenantId);
    // refresh table
    await this.tenantService
      .getTenants(TenantStatus.ACTIVE)
      .then((res) => (this.tenants = res));
  }

  async showPotentialTenant() {
    await this.tenantService
      .getTenants(TenantStatus.POTENTIAL)
      .then((res) => (this.tenants = res));
  }

  async showPendingTenant() {
    await this.tenantService
      .getTenants(TenantStatus.PENDING)
      .then((res) => (this.tenants = res));
  }

  async showActiveTenant() {
    await this.tenantService
      .getTenants(TenantStatus.ACTIVE)
      .then((res) => (this.tenants = res));
  }

  async showAllTenant() {
    await this.tenantService.getTenants().then((res) => (this.tenants = res));
  }
}
