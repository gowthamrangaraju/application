import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UserDetailsAddComponent } from './user-details-add/user-details-add.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'lists',
    component: UserListComponent,
  },
  {
    path: 'add',
    component: UserDetailsAddComponent,
  },
  {
    path: 'edit/:editKey',
    component: UserDetailsAddComponent,
  },
  {
    path: 'info',
    component: UserInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
