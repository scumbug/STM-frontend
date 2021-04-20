import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Amenity } from 'src/app/model/amenity.model';
import { Schedule } from 'src/app/model/schedule.model';
import { Unit } from 'src/app/model/unit.model';
import { AmenityService } from 'src/app/service/amenity.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { UnitService } from 'src/app/service/unit.service';

@Component({
  selector: 'app-schedule-amenity',
  templateUrl: './schedule-amenity.component.html',
  styleUrls: ['./schedule-amenity.component.css'],
})
export class ScheduleAmenityComponent implements OnInit {
  showScheduleAmenityDialog: boolean = false;
  scheduleAmenityFormGroup: FormGroup;
  amenities: Amenity[];
  units: Unit[];
  minDateValue: Date = new Date();
  @Output() showScheduleAmenityDialogEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private amenityService: AmenityService,
    private unitService: UnitService,
    private messageService: MessageService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.loadInitData();
    this.scheduleAmenityFormGroup = this.createAmenityForm();
  }

  showDialog() {
    this.showScheduleAmenityDialog = true;
  }

  async onSubmit() {
    console.log(this.scheduleAmenityFormGroup.value);
    await this.scheduleService.addSchedule(
      this.scheduleAmenityFormGroup.value as Schedule
    );

    //send toast
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Added new schedule',
      life: 3000,
    });

    // close dialog
    this.showScheduleAmenityDialog = false;
    this.showScheduleAmenityDialogEmitter.emit('refresh');
  }

  private createAmenityForm(): FormGroup {
    return this.fb.group({
      amenityId: null,
      unitId: null,
      scheduleDate: this.fb.control('', Validators.required),
      scheduleStatus: 'PENDING',
    });
  }

  private async loadInitData() {
    this.amenities = await this.amenityService.getAmenities();
    this.units = await this.unitService.getAllUnits();
  }
}
