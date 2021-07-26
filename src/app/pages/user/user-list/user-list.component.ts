import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { UserService } from '../services/user.service';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userLists: any;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.listUserDetails()
  }

  ngOnInit(): void {

  }

  // List the user Details
  listUserDetails() {

    this.userService.getUserData().subscribe(response => {
      console.log(response)
      if (response.length > 0) {
        this.userLists = response;
      } else {
        // Snackbar popup
        this._snackBar.open("Add data to list the user details", 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });

  }

  // Check Prevent the user Email Actions
  check(value: any) {
    if (value == 'email') { return false; } else { return true; }
  }

  // Confirmation Dailog
  confirmDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(id);
      }
    });
  }

  // Delete Details
  delete(data: any) {

    this.userService.deleteUserData(data).then((value: any) => {
      console.log(value)
      // Snackbar popup
      this._snackBar.open('Deleted Successfully', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
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

}
