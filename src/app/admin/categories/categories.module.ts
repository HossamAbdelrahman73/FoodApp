import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
    ViewCategoryComponent,
    DeleteCategoryComponent,
  ],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule, FormsModule],
})
export class CategoriesModule {}
