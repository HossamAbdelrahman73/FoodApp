import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../shared/home/home.component';
import { adminGuard } from '../core/gaurds/admin/admin.guard';
import { userGuard } from '../core/gaurds/userSystem/user.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      // { path: 'home', component: HomeComponent },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        canActivate: [userGuard],
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
