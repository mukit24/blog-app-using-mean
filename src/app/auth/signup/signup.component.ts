import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: [null, [RxwebValidators.required({message: 'Username is required'}), RxwebValidators.maxLength({value:20, message: 'Please choose shorter username' })]],
      email: [null, [RxwebValidators.required({message: 'Email is required'}), RxwebValidators.email({message: 'Enter a valid email'})]],
      password: [null, [RxwebValidators.required({message: 'Password is required'})]]
    })
  }

  onSignUp() {
    console.log(this.signUpForm)
  }

  get formControl() {
    return this.signUpForm.controls;
  }
}
