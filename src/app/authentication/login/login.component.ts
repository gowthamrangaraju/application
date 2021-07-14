import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {

    // Form Initialize
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {

  }


  login() {

    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    this.authservice.userLogin(this.loginForm.value)
      .then(res => {
        // Snackbar popup
        this._snackBar.open('Logged in Successfully', 'Close', {
          duration: 5000,   
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        // Pages Navigation
        this.router.navigate(['/pages'])

      })
      .catch(error => {
        // Snackbar popup
        this._snackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });

  }

}
