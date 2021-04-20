import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Amenity } from 'src/app/model/amenity.model';
import { Tenant } from 'src/app/model/tenant.model';
import { Unit } from 'src/app/model/unit.model';
import { AmenityService } from 'src/app/service/amenity.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { TenantService } from 'src/app/service/tenant.service';

@Component({
  selector: 'app-tenant-request-amenity',
  templateUrl: './tenant-request-amenity.component.html',
  styleUrls: ['./tenant-request-amenity.component.css'],
})
export class TenantRequestAmenityComponent implements OnInit {
  showRequestAmenityDialog: boolean = false;
  tenantRequestAmenityForm: FormGroup;
  minDateValue = new Date();
  amenities: Amenity[];
  leasedUnit: Tenant;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private messageService: MessageService,
    private amenityService: AmenityService,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.tenantRequestAmenityForm = this.createRequestAmenityForm();
    this.amenityService.getAmenities().then((res) => {
      this.amenities = res;
    });
    this.tenantService
      .getTenantByUserId(parseInt(localStorage.getItem('id')))
      .then((res) => {
        this.leasedUnit = res;
        this.tenantRequestAmenityForm
          .get('unitId')
          .setValue(this.leasedUnit.leasedUnit);
      });
  }

  showDialog() {
    if (this.leasedUnit.leasedUnit != null) {
      this.showRequestAmenityDialog = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'No Leased Unit!',
        detail: 'You have no leased unit',
        life: 3000,
      });
    }
  }

  private createRequestAmenityForm(): FormGroup {
    return this.fb.group({
      unitId: null,
      amenityId: null,
      scheduleDate: this.fb.control('', Validators.required),
      scheduleStatus: 'PENDING',
    });
  }

  onSubmit() {
    console.log(this.tenantRequestAmenityForm.value);

    // send toast
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Added new schedule',
      life: 3000,
    });

    // close dialog
    this.showRequestAmenityDialog = false;
  }
}
