import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'add', component: AddEditRecipesComponent },
  { path: 'edit/:id', component: EditRecipeComponent },
  { path: 'view/:id', component: ViewRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
