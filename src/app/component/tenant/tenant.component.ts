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

  showTenantForm() {
    this.tenantForm = true;
  }

  onTenantFormClose(event) {
    this.tenantForm = event;
  }
}
