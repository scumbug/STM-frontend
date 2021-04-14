import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactType } from 'src/app/model/contact.model';
import { Tenant } from 'src/app/model/tenant.model';

@Component({
  selector: 'app-convert-tenant-form',
  templateUrl: './convert-tenant-form.component.html',
  styleUrls: ['./convert-tenant-form.component.css'],
})
export class ConvertTenantFormComponent implements OnInit {
  @Input() convertTenantForm: boolean = false;
  @Output() convertTenantFormEmitter = new EventEmitter();

  contactFormGroup: FormGroup;
  leaseFormGroup: FormGroup;
  tenantFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactFormGroup = this.createContact();
    this.leaseFormGroup = this.createLease();
    this.tenantFormGroup = this.createTenant();
  }

  private createContact(): FormGroup {
    return this.fb.group({
      contactType: ContactType.PRIMARY,
      contactNumber: this.fb.control('', Validators.required),
      contactEmail: this.fb.control('', [
        Validators.required,
        Validators.email,
      ]),
      userId: null,
    });
  }

  private createLease(): FormGroup {
    return this.fb.group({
      startDate: this.fb.control('', Validators.required),
      endDate: this.fb.control('', [Validators.required]),
      unitId: null,
      tenantId: null,
      rent: this.fb.control('', Validators.required),
    });
  }

  private createTenant(): FormGroup {
    return this.fb.group({
      tenantId: null,
      leasedUnit: null,
    });
  }

  onSubmit(): void {}

  showDialog(): void {
    this.convertTenantForm = true;
  }

  onClose(): void {
    this.convertTenantFormEmitter.emit(false);
  }

  ngOnDestroy() {
    this.convertTenantFormEmitter.unsubscribe();
  }
}
