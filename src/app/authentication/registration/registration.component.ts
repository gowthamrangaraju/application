import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { AuthService } from '../services/auth.service';

// helpers
import { MustMatch } from 'src/app/helpers/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;
  mustMatch = true;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

    // Form Initialize
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    }, {
      Validators: MustMatch('password', 'confirmPassword')
    });

  }

  ngOnInit(): void {

  }

  // Registeration Submit
  register() {
    this.submitted = true;

    // Validation
    if (this.registrationForm.invalid) { return; }
    if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      this.registrationForm.controls.confirmPassword.setErrors({ mustMatch: true }); 
      return;
    } 
    
    this.authservice.userRegisteration(this.registrationForm.value)
      .then(res => {
        // Snackbar popup
        this._snackBar.open('User Registeration Success', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        // Login Navigation
        this.router.navigate(['/authentication/login']);
      })
      .catch(error => {
        this.submitted = false;
        // Snackbar popup
        this._snackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });

  }
}
