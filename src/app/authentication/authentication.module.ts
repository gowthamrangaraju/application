import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule} from '../shared/shared.module';

// Components
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { RegistrationComponent } from './registration/registration.component';

// Service
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ AuthService ]
})
export class AuthenticationModule { }
