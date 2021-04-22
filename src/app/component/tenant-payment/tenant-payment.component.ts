import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/service/payment.service';
import { TenantService } from 'src/app/service/tenant.service';

@Component({
  selector: 'app-tenant-payment',
  templateUrl: './tenant-payment.component.html',
  styleUrls: ['./tenant-payment.component.css'],
})
export class TenantPaymentComponent implements OnInit {
  showTenantPaymentDialog: boolean = false;
  tenantPaymentForm: FormGroup;
  payments: Payment[];
  formPayload = new FormData();

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private paymentService: PaymentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.tenantPaymentForm = this.createTenantPaymentForm();
  }

  showDialog() {
    this.getPaymentsForTenant().then((res) => {
      if (this.payments.length != 0) {
        this.showTenantPaymentDialog = true;
        for (let payment of this.payments) {
          payment.paymentPeriod = `${payment.paymentStartPeriod} to ${payment.paymentEndPeriod}`;
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You have no leased unit or outstanding payment',
          life: 3000,
        });
      }
    });
  }

  private createTenantPaymentForm(): FormGroup {
    return this.fb.group({
      paymentId: this.fb.control('', Validators.required),
      amount: this.fb.control('', Validators.required),
    });
  }

  upload($event) {
    this.formPayload.append('paymentProof', $event.files[0]);
  }

  async getPaymentsForTenant() {
    //get full tenant details
    const tenant = await this.tenantService.getTenantByUserId(
      parseInt(localStorage.getItem('id'))
    );

    this.payments = await this.paymentService.getPaymentsForTenant(
      tenant.tenantId,
      tenant.leasedUnit
    );
  }

  onSubmit() {
    this.formPayload.append(
      'form',
      JSON.stringify(this.tenantPaymentForm.value)
    );
    this.paymentService.addPayment(this.formPayload);

    //send toast
    this.messageService.add({
      severity: 'Success',
      summary: 'Success!',
      detail: 'Payment has been submitted',
      life: 3000,
    });

    //close dialog
    this.showTenantPaymentDialog = false;
  }
}
