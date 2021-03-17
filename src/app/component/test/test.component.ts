import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  test: Object;
  testForm: FormGroup;

  ngOnInit(): void {
    this.testForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      type: this.fb.control('', Validators.required),
    });
    this.http
      .get<User[]>('/api/users/')
      .toPromise()
      .then((res) => console.log(res));
  }

  async onSubmit(): Promise<void> {
    // post to /users
    console.log(this.testForm.value);
    this.http
      .post<User>('/api/users/', this.testForm.value)
      .toPromise()
      .then((res) => console.log(res));
  }
}
