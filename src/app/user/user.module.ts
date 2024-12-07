import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserRecipesComponent } from './components/user-recipes/user-recipes.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserFavComponent } from './components/user-fav/user-fav.component';
import { SharedModule } from '../shared/shared.module';
import { ViewUserRecipeComponent } from './components/view-user-recipe/view-user-recipe.component';

@NgModule({
  declarations: [
    UserComponent,
    UserRecipesComponent,
    UserHomeComponent,
    UserFavComponent,
    ViewUserRecipeComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
