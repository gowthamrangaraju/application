import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details-add',
  templateUrl: './user-details-add.component.html',
  styleUrls: ['./user-details-add.component.scss']
})
export class UserDetailsAddComponent implements OnInit {

  addUserForm: FormGroup;
  submitted = false;
  page_title: string = "Details";

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) {

    // Form Initialize
    this.addUserForm = this.fb.group({
      keyUser: ['', Validators.required],
      valueUser: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    if (this.router.url.indexOf("edit") !== -1) {
      this.page_title = "Edit Details";
      const editKey = this.aRoute.snapshot.paramMap.get('editKey');
      this.retriveData(editKey);
    } else {
      this.page_title = "Add Details";
    }
  }

  //  Retrive Data from Firebase
  retriveData(editKey: any) {
    
    this.userService.retrive(editKey)
      .then((resp: any) => {

        this.addUserForm.patchValue({
          keyUser: resp.data[0]['key'],
          valueUser: resp.data[0]['value']
        });

      })
      .catch((error) => {
        // Snackbar popup
        this._snackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  // Cancel Submission Form
  cancel() {
    this.router.navigateByUrl('/pages/user/lists');
  }

  // Submit Form
  submitUser() {
    this.submitted = true;

    if (this.addUserForm.invalid) { return; }

    let data = {
      key: this.addUserForm.value.keyUser,
      value: this.addUserForm.value.valueUser
    };

    if (this.router.url.indexOf("edit") !== -1) {
      this.editUser(this.aRoute.snapshot.paramMap.get('editKey'), data);
    } else {
      this.addUser(data);
    }

  }

  // Update users details to firestore
  editUser(id:any, data: any) {
    this.userService.updateUserData(id, data)
      .then((res: any) => {
        // Snackbar popup
        this._snackBar.open('Updated in Successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        // Pages Navigation
        this.router.navigate(['/pages/user/lists'])
      })
      .catch((error) => {
        
        // Snackbar popup
        this._snackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  // Add User Details to firestore
  addUser(data: any) {
    this.userService.addUserData(data)
      .then((res: any) => {
        // Snackbar popup
        this._snackBar.open('Added in Successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        // Pages Navigation
        this.router.navigate(['/pages/user/lists'])
      })
      .catch((error) => {
        // Snackbar popup
        this._snackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

}
