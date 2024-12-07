import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRecipesComponent } from './components/user-recipes/user-recipes.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserFavComponent } from './components/user-fav/user-fav.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserHomeComponent },
      { path: 'recipe', component: UserRecipesComponent },
      { path: 'fav', component: UserFavComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
