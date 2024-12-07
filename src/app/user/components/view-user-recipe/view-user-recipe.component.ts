import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditCategoryComponent } from 'src/app/admin/categories/components/add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-view-user-recipe',
  templateUrl: './view-user-recipe.component.html',
  styleUrls: ['./view-user-recipe.component.scss'],
})
export class ViewUserRecipeComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnDestroy(): void {
    // localStorage.removeItem('cat');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
