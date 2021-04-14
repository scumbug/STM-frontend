import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactType } from 'src/app/model/contact.model';
import { TenantStatus } from 'src/app/model/tenant.model';
import { TenantWrapper } from 'src/app/model/tenantwrapper.model';
import { User, UserType } from 'src/app/model/user.model';
import { TenantService } from 'src/app/service/tenant.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css'],
})
export class TenantFormComponent implements OnInit {
  @Input() tenantForm: boolean = false;
  @Output() tenantFormEmitter = new EventEmitter();

  contactFormGroup: FormGroup;
  userFormGroup: FormGroup;
  tenantFormGroup: FormGroup;
  agents: User[];
  assignedAgent: User;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private UserService: UserService,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    // generate forms
    this.tenantFormGroup = this.createTenant();
    this.userFormGroup = this.createUser();
    this.contactFormGroup = this.createContact();

    // get dynamic data from backend
    this.getAllAgents().then((res) => {
      this.agents = res;
    });
  }

  private createContact(): FormGroup {
    return this.fb.group({
      contactType: ContactType.PRIMARY,
      contactNumber: this.fb.control('', Validators.required),
      contactEmail: this.fb.control('', [
        Validators.required,
        Validators.email,
      ]),
      userId: null,
    });
  }

  private createTenant(): FormGroup {
    return this.fb.group({
      company: this.fb.control('', Validators.required),
      tenantStatus: TenantStatus.POTENTIAL,
      notes: this.fb.control('', Validators.required),
      userId: null,
      assignedAgent: this.fb.control('', Validators.required),
    });
  }

  private createUser(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      type: UserType.TENANT,
    });
  }

  private async getAllAgents(): Promise<User[]> {
    return await this.UserService.getAllAgents();
  }

  onSubmit(): void {
    // POST to /user
    // POST to /contact
    // POST to /tenant
    // build TenantWrapper payload
    const payload: TenantWrapper = {
      tenant: this.tenantFormGroup.value,
      user: this.userFormGroup.value,
      contact: [this.contactFormGroup.value],
    };
    console.log(payload);
    this.tenantService.addTenant(payload as TenantWrapper);

    // send toast
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Tenant Created',
      life: 3000,
    });
    // close dialog
    this.tenantForm = false;
  }

  showDialog(): void {
    this.tenantForm = true;
  }

  onClose(): void {
    this.tenantFormEmitter.emit(false);
  }

  ngOnDestroy() {
    this.tenantFormEmitter.unsubscribe();
  }
}
