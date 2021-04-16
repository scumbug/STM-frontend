import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property, PropertyStatus } from 'src/app/model/property.model';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {
  @Input() propertyForm: boolean = false;
  @Input() property: Property;
  @Output() propertyFormEmitter = new EventEmitter();

  propertyFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    // build form for addition or edits
    console.log(this.property);
    this.propertyFormGroup = this.createPropertyForm();
  }

  showDialog(): void {
    this.propertyFormGroup = this.createPropertyForm();
    this.propertyForm = true;
  }

  updateForm(): void {
    this.propertyFormGroup.setValue(this.property);
  }

  private createPropertyForm(): FormGroup {
    return this.fb.group({
      propertyId: this.property.propertyId || '',
      name: this.fb.control(this.property.name || '', Validators.required),
      address: this.fb.control(
        this.property.address || '',
        Validators.required
      ),
      type: this.fb.control(
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
        this.property.maintenanceFee || '',
        Validators.required
      ),
    });
  }

  onSubmit() {
    //TODO: send to backend

    //Check if edit or add

    console.log(this.propertyFormGroup.value);
    //const res = this.propertyService.addProperties(this.propertyFormGroup.value);

    //TODO: toast

    // close dialog
    this.propertyForm = false;
  }

  onClose() {
    this.propertyFormEmitter.emit(false);
  }

  ngOnDestroy() {
    this.propertyFormEmitter.unsubscribe();
  }
}
