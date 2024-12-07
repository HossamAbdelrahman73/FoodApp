import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewUsersComponent } from './components/view-users/view-users.component';

@NgModule({
  declarations: [UsersComponent, ViewUsersComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
})
export class UsersModule {}
