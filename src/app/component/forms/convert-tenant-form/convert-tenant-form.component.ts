import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactType } from 'src/app/model/contact.model';
import { Tenant } from 'src/app/model/tenant.model';
import { Property } from 'src/app/model/property.model';
import { PropertyService } from '../../../service/property.service';
import { Unit } from 'src/app/model/unit.model';
import { UnitService } from '../../../service/unit.service';
import { LeaseWrapper } from 'src/app/model/leasewrapper.model';
import { LeaseService } from 'src/app/service/lease.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-convert-tenant-form',
  templateUrl: './convert-tenant-form.component.html',
  styleUrls: ['./convert-tenant-form.component.css'],
})
export class ConvertTenantFormComponent implements OnInit {
  convertTenantForm: boolean;
  tenant: Tenant = {} as Tenant;
  @Output() convertTenantFormEmitter = new EventEmitter();

  properties: Property[];
  units: Unit[];

  contactFormGroup: FormGroup;
  leaseFormGroup: FormGroup;
  tenantFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private unitService: UnitService,
    private leaseService: LeaseService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contactFormGroup = this.createContact(this.tenant);
    this.leaseFormGroup = this.createLease(this.tenant);
    this.propertyService.getProperties().then((res) => {
      this.properties = res;
    });
  }

  private createContact(tenant: Tenant): FormGroup {
    return this.fb.group({
      contactType: ContactType.BILLING,
      contactNumber: this.fb.control('', Validators.required),
      contactEmail: this.fb.control('', [
        Validators.required,
        Validators.email,
      ]),
      userId: tenant.userId || null,
    });
  }

  private createLease(tenant: Tenant): FormGroup {
    return this.fb.group({
      startDate: this.fb.control('', Validators.required),
      endDate: this.fb.control('', [Validators.required]),
      unitId: this.fb.control('', Validators.required),
      tenantId: tenant.tenantId || null,
      rent: this.fb.control('', Validators.required),
    });
  }

  async getUnitsFromPropertyId(propertyId: number) {
    this.units = await this.unitService.getFreeUnits(propertyId);
  }

  async onSubmit(): Promise<void> {
    const payload: LeaseWrapper = {
      lease: this.leaseFormGroup.value,
      contacts: [this.contactFormGroup.value],
    };

    console.log(payload);

    // send to backend
    await this.leaseService.convertTenant(payload);

    // send toast
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Tenant Converted',
      life: 3000,
    });

    // refresh table
    this.convertTenantFormEmitter.emit('refresh');

    // close dialog
    this.convertTenantForm = false;
  }

  showDialog(tenant): void {
    this.convertTenantForm = true;
    this.contactFormGroup = this.createContact(tenant);
    this.leaseFormGroup = this.createLease(tenant);
  }

  onClose(): void {
    this.convertTenantFormEmitter.emit(false);
  }

  ngOnDestroy() {
    this.convertTenantFormEmitter.unsubscribe();
  }
}
