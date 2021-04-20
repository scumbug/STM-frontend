import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  ManagementStatus,
  Property,
  PropertyStatus,
  PropertyType,
} from 'src/app/model/property.model';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  bulkUnit: boolean = false;
  propertyId: number;
  properties: Property[];
  property: Property;
  selected: Property[];
  submitted: boolean;
  propertyDialog: boolean;
  propertyForm: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private propertyService: PropertyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // grab all property from backend
    // this.propertyService.getProperties().then((res) => {
    //   this.properties = res;
    //   // grab available leased units
    //   for (let property of this.properties) {
    //     this.getLeasedUnit(property.propertyId).then((res) => {
    //       property.leasedUnits = res;
    //     });
    //   }
    // });

    this.refreshProperties();

    this.property = {} as Property;

  }

  async refreshProperties(): Promise<void> {
    this.propertyService.getProperties().then((res) => {
      this.properties = res;
      // grab available leased units
      for (let property of this.properties) {
        this.getLeasedUnit(property.propertyId).then((res) => {
          property.leasedUnits = res;
        });
      }
    });
  }

  async archiveProperty(property: Property) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to archive ' + property.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.properties = this.properties.filter(
          (val) => val.propertyId !== property.propertyId
        );
        const res = await this.propertyService.archiveProperties(
          property.propertyId
        );
        this.property = {} as Property;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Property Deleted',
          life: 3000,
        });
      },
    });
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.properties.length; i++) {
      if (this.properties[i].propertyId === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  showBulkUnit(propertyId) {
    this.bulkUnit = true;
    this.propertyId = propertyId;
  }

  onBulkUnitClose(event) {
    this.bulkUnit = event;
  }


  async getLeasedUnit(id: number): Promise<number> {
    return (await this.propertyService.getLeaseUnitById(id)) as number;
  }
}
