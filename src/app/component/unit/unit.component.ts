import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private actRoute: ActivatedRoute,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.unitService
      .getUnits(this.actRoute.snapshot.params['propertyId'])
      .then((res) => (this.units = res));
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
}
