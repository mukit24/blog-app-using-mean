import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [RxwebValidators.required({message: 'Email is required'}), RxwebValidators.email({message: 'Enter a valid email'})]],
      password: [null, [RxwebValidators.required({message: 'Password is required'})]]
    })
  }

  onLogin() {
    console.log(this.loginForm)
  }

  get formControl() {
    return this.loginForm.controls;
  }
}
