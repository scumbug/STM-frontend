import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });

    setTimeout(() => {
      if (this.route.snapshot.queryParamMap.get('logout') == '1') {
        // send toast
        console.log('hello');
        this.messageService.add({
          severity: 'error',
          summary: 'Logged Out',
          detail: 'Please log in again',
          life: 3000,
        });
      }
    }, 1000);
  }

  async login() {
    const res = await this.auth.login(this.loginForm.value);
    if (!res) {
      this.messageService.add({
        severity: 'error',
        summary: 'Wrong username/password',
        detail: 'Please log in again',
        life: 3000,
      });
    } else {
      this.router.navigate(['/landing']);
    }
  }
}
