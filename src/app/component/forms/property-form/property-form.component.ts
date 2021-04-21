import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ManagementStatus,
  Property,
  PropertyStatus,
  PropertyType,
} from 'src/app/model/property.model';
import { PropertyService } from 'src/app/service/property.service';
import { BulkUnitComponent } from 'src/app/component/bulk-unit/bulk-unit.component';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {
  @Input() propertyForm = false;
  @Input() property: Property;
  @Output() propertyFormEmitter = new EventEmitter();
  @ViewChild('bulkUnitDialog') bulkUnitDialog: BulkUnitComponent;

  managementStatus: { label: ManagementStatus; value: ManagementStatus }[];
  propertyStatus: { label: PropertyStatus; value: PropertyStatus }[];
  propertyType: { label: PropertyType; value: PropertyType }[];
  propertyFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    // initalise form
    this.propertyFormGroup = this.createPropertyForm();

    // setup enums
    this.propertyStatus = Object.values(PropertyStatus).map((key) => ({
      label: key,
      value: key,
    }));
    this.managementStatus = Object.values(ManagementStatus).map((key) => ({
      label: key,
      value: key,
    }));
    this.propertyType = Object.values(PropertyType).map((key) => ({
      label: key,
      value: key,
    }));
  }

  showDialog(property?: Property): void {
    if (property) {
      this.property = property;
    } else {
      this.property = {} as Property;
    }
    this.propertyFormGroup = this.createPropertyForm();
    this.propertyForm = true;
  }

  private createPropertyForm(): FormGroup {
    return this.fb.group({
      propertyId: this.property.propertyId || '',
      name: this.fb.control(this.property.name || '', Validators.required),
      address: this.fb.control(
        this.property.address || '',
        Validators.required
      ),
      propertyType: this.fb.control(
        this.property.propertyType || '',
        Validators.required
      ),
      managementStatus: this.fb.control(
        this.property.managementStatus || '',
        Validators.required
      ),
      propertyStatus: PropertyStatus.ACTIVE,
      maintenanceFee: this.fb.control(
        this.property.maintenanceFee || '',
        Validators.required
      ),
      builtDate: this.fb.control(
        this.property.builtDate != null
          ? new Date(this.property.builtDate)
          : '',
        Validators.required
      ),
    });
  }

  async onSubmit(): Promise<void> {
    // Check if edit or add
    if (this.property.propertyId == null) {
      const res = await this.propertyService.addProperties(
        this.propertyFormGroup.value as Property
      );
      this.bulkUnitDialog.showDialog(res.propertyId);
    } else {
      await this.propertyService.updateProperties(
        this.propertyFormGroup.value as Property
      );
    }

    // TODO: toast

    // close dialog
    this.propertyFormEmitter.emit('refresh');
    this.propertyForm = false;
  }
}
