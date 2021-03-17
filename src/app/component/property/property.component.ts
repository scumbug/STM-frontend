import { Component, OnInit } from '@angular/core';
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
  properties: Property[];
  property: Property;
  selected: Property[];
  submitted: boolean;
  propertyDialog: boolean;
  managementStatus: { label: ManagementStatus; value: ManagementStatus }[];
  propertyStatus: { label: PropertyStatus; value: PropertyStatus }[];
  propertyType: { label: PropertyType; value: PropertyType }[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    // grab all property from backend
    this.propertyService.getProperties().then((res) => (this.properties = res));

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

  openNew() {
    this.property = {} as Property;
    this.submitted = false;
    this.propertyDialog = true;
  }

  hideDialog() {
    this.propertyDialog = false;
    this.submitted = false;
  }

  editProperty(property: Property) {
    this.property = { ...property };
    // cast date string into date object
    this.property.builtDate = new Date(this.property.builtDate);
    this.propertyDialog = true;
  }

  async deleteProperty(property: Property) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + property.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.properties = this.properties.filter(
          (val) => val.propertyId !== property.propertyId
        );
        const res = await this.propertyService.deleteProperties(
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

  async saveProperty() {
    this.submitted = true;

    if (this.property.name.trim()) {
      if (this.property.propertyId) {
        this.properties[
          this.findIndexById(this.property.propertyId)
        ] = this.property;

        //TODO call PUT to backend
        const res = await this.propertyService.addProperties(this.property);

        // send toast
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Property Updated',
          life: 3000,
        });
      } else {
        //call POST to backend
        const res = await this.propertyService.addProperties(this.property);
        this.properties.push(res);

        // send toast
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Property Created',
          life: 3000,
        });
      }

      this.properties = [...this.properties];
      this.propertyDialog = false;
      this.property = {} as Property;
    }
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
}
