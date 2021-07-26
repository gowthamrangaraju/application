import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

// Routing Module
import { UserRoutingModule } from './user-routing.module';

// Module
import { SharedModule } from 'src/app/shared/shared.module';

// Component
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsAddComponent } from './user-details-add/user-details-add.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UserInfoComponent } from './user-info/user-info.component';

// Services
import { AuthService } from '../../authentication/services/auth.service';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsAddComponent,
    ConfirmationDialogComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AuthService]
})
export class UserModule { }
