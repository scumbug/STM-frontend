import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  templateForm: FormGroup;
  existing: any;
  templateField: string;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      content: this.fb.control('', Validators.required),
    });

    this.adminService.getEmailTemplate().then((res) => {
      this.existing = res;
      this.templateField = res.content;
    });
  }

  async updateForm() {
    const payload = {
      name: this.existing.name,
      settingId: this.existing.settingId,
      content: this.templateForm.get('content').value,
    };
    this.adminService.updateEmailTemplate(payload);

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Settings Updated',
      life: 3000,
    });
  }
}
