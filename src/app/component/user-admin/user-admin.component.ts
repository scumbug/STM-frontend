import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
})
export class UserAdminComponent implements OnInit {
  form: FormGroup;
  userForm: FormGroup;
  contactForm: FormGroup;
  user: User;
  contact: Contact;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.buildForm();
    this.form = this.fb.group({
      user: this.userForm,
      contact: this.contactForm,
    });
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      type: this.fb.control('', Validators.required),
    });

    this.contactForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', Validators.required),
    });
  }

  async createUser(): Promise<void> {
    // cast user form into user object
    this.user = this.userForm.value as User;
    // cast contact form into contact object
    this.contact = this.contactForm.value as Contact;

    // post to backend
    const res = await this.userService.addUser(this.user);

    // add userid to contact if successful and post backend
    if (res != null) {
      this.contact.userId = res.userId;
      //await this.contactService.addContact(this.contact);
    }
  }
}
