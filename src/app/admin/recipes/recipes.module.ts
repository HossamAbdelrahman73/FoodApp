import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

@NgModule({
  declarations: [
    RecipesComponent,
    AddEditRecipesComponent,
    EditRecipeComponent,
    ViewRecipeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule,
    NgxDropzoneModule,
  ],
})
export class RecipesModule {}
