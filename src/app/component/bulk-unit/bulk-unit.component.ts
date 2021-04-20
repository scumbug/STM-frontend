import {EventEmitter, Host, OnDestroy} from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Unit } from 'src/app/model/unit.model';
import { UnitService } from 'src/app/service/unit.service';
import {PropertyComponent} from "../property/property.component";

@Component({
  selector: 'app-bulk-unit',
  templateUrl: './bulk-unit.component.html',
  styleUrls: ['./bulk-unit.component.css'],
})
export class BulkUnitComponent implements OnInit, OnDestroy {
  @Input() bulkUnit: boolean = false;
  @Output() bulkUnitEmitter = new EventEmitter();
  @Input() propertyId: number;
  bulkUnitForm: FormGroup;
  unitArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    // init units array
    this.unitArray = this.fb.array([]);
    this.bulkUnitForm = this.fb.group({
      units: this.unitArray,
    });
    this.unitArray.push(this.createUnit());
  }

  private createUnit(): FormGroup {
    return this.fb.group({
      propertyId: this.propertyId,
      unitNumber: this.fb.control('', Validators.required),
      floorArea: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });
  }

  addUnit(): void {
    this.unitArray.push(this.createUnit());
  }

  removeUnit(i: number): void {
    this.unitArray.removeAt(i);
  }

  async onSubmit(): Promise<void> {
    this.unitService.bulkAddUnits(this.unitArray.value as Unit[]);
    // send toast
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Units Created',
      life: 3000,
    });
    // close dialog
    this.bulkUnitEmitter.emit();
    this.bulkUnit = false;
  }

  showDialog(propertyId: number): void {
    this.propertyId = propertyId;
    this.unitArray = this.fb.array([]);
    this.bulkUnitForm = this.fb.group({
      units: this.unitArray,
    });
    this.bulkUnit = true;
  }

  onClose(): void {
    this.bulkUnitEmitter.emit(false);
    this.unitArray.clear();
  }

  ngOnDestroy() {
    this.bulkUnitEmitter.unsubscribe();
  }
}
