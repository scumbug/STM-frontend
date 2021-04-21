import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unit } from 'src/app/model/unit.model';
import { UnitService } from 'src/app/service/unit.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css'],
})
export class EditUnitComponent implements OnInit {
  editUnit: boolean = false;
  editUnitFormGroup: FormGroup;
  unit: Unit;
  @Output() editUnitEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.unit = {} as Unit;
    this.editUnitFormGroup = this.createUnitForm(this.unit);
  }

  showEditUnit(unitId: number): void {
    this.unitService.getUnit(unitId).then((res) => {
      console.log(res);
      this.editUnitFormGroup = this.createUnitForm(res);
    });
    this.editUnit = true;
  }

  createUnitForm(unit: Unit): FormGroup {
    return this.fb.group({
      unitId: unit.unitId,
      floorArea: this.fb.control(unit.floorArea, Validators.required),
      propertyId: unit.propertyId,
      unitNumber: this.fb.control(unit.unitNumber, Validators.required),
    });
  }

  async onSubmit() {
    await this.unitService.editUnit(this.editUnitFormGroup.value as Unit);
    // send toast
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Units Updated',
      life: 3000,
    });
    // close dialog
    this.editUnitEmitter.emit('refresh');
    this.editUnit = false;
  }

  onClose() {
    this.editUnitFormGroup.reset();
  }
}
