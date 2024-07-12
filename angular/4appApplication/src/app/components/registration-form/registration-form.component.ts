import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  arePasswordsMatching: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)]],
      passwordConfirmed: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchingChecker as ValidatorFn
    });
  }

  passwordMatchingChecker(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const passwordConfirmed = formGroup.get('passwordConfirmed')?.value;

    return password === passwordConfirmed ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      alert('form submitted successfully.');
    }
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get passwordConfirmed() {
    return this.registrationForm.get('passwordConfirmed');
  }
}
