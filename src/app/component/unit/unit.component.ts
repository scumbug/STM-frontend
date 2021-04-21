import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Unit } from 'src/app/model/unit.model';
import { LeaseService } from 'src/app/service/lease.service';
import { UnitService } from 'src/app/service/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})
export class UnitComponent implements OnInit {
  propertyId: number;
  units: Unit[];
  unitDialog: boolean;
  unit: Unit;
  submitted: boolean;
  bulkUnit: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private unitService: UnitService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private leaseService: LeaseService
  ) {}

  ngOnInit(): void {
    this.propertyId = this.actRoute.snapshot.params['propertyId'];
    this.refreshUnits();
  }

  refreshUnits(): void {
    this.unitService
      .getUnits(this.propertyId)
      .then((res) => {
        // grab units from backend
        this.units = res;
      })
      .then((res) => {
        // grab lease status
        for (const unit of this.units) {
          this.leaseService.getLease(unit.unitId).then((res) => {
            unit.lease = res;
          });
        }
      });
  }

  openNew() {
    this.unit = {} as Unit;
    this.submitted = false;
    this.unitDialog = true;
  }

  hideDialog() {
    this.unitDialog = false;
    this.submitted = false;
  }

  showBulkUnit() {
    this.bulkUnit = true;
  }

  onBulkUnitClose(event) {
    this.bulkUnit = false;
    this.unitService
      .getUnits(this.propertyId)
      .then((res) => (this.units = res));
  }

  async deleteUnit(unit: Unit) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + unit.unitNumber + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.units = this.units.filter((val) => val.unitId !== unit.unitId);
        const res = await this.unitService.deleteUnit(unit.unitId);
        this.unit = {} as Unit;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Unit Deleted',
          life: 3000,
        });
      },
    });
  }
}
