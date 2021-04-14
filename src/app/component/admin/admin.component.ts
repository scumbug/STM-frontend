import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private adminService: AdminService, private fb: FormBuilder) {}

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
      adminId: this.existing.adminId,
      content: this.templateForm.get('content').value,
    };
    console.log(payload);
    this.adminService.updateEmailTemplate(payload);
  }
}
