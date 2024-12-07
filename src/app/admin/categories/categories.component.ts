import { Component } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategories } from './interfaces/icategories';
import { PageEvent } from '@angular/material/paginator';
import { Ipagnator } from './interfaces/ipagnator';
import { _closeDialogVia, MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { DeleteChoosenItemComponent } from 'src/app/shared/delete-item/delete-choosen-item/delete-choosen-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(
    public dialog: MatDialog,
    private _CategoriesService: CategoriesService,
    private _ToastrService: ToastrService
  ) {}

  pagnator: Ipagnator = {
    length: 0,
    pageNumber: 1,
    pageSize: 5,
  };

  searchName: string = '';

  responseCategories: any;
  listCategories: ICategories[] = [];
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._CategoriesService
      .getAllCategories(
        this.pagnator.pageSize,
        this.pagnator.pageNumber,
        this.searchName
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listCategories = res.data;
          this.responseCategories = res;
          this.pagnator.pageNumber = res.pageNumber;
          this.pagnator.pageSize = res.pageSize;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  // pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    console.log(e);
    // this.pageEvent = e;
    this.pagnator.length = e.length;
    this.pagnator.pageSize = e.pageSize;
    this.pagnator.pageNumber = e.pageIndex + 1;
    this.getCategories();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Add category');
      // console.log(result);

      if (result) {
        console.log(result);
        this._CategoriesService.addCategory(result).subscribe({
          next: (res) => {
            console.log(res);
            this.getCategories();
            this._ToastrService.success('Added Successfully');
          },
          error: (err) => {
            console.log(err);
          },
        });
        // this.getCategories();
      }
    });
  }

  openView(id: number): void {
    let cat = '';
    this._CategoriesService.getSingleCategory(id).subscribe({
      next: (res) => {
        console.log(res);
        cat = res.name;
        localStorage.setItem('cat', cat);
        const dialogRef = this.dialog.open(ViewCategoryComponent);
        console.log('good');
      },
      error: (err) => {
        console.log(err);
      },
      complete() {},
    });
  }

  openEdit(id: number) {
    // let cat = '';
    this._CategoriesService.getSingleCategory(id).subscribe({
      next: (res) => {
        console.log(res);
        // cat = res.name;
        // localStorage.setItem('cat', cat);

        const dialogRef = this.dialog.open(AddEditCategoryComponent, {
          data: { name: `${res.name}` },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('Edit Category');
          if (result) {
            console.log(result);
            this._CategoriesService.editCategory(id, result.name).subscribe({
              next: (res) => {
                console.log(res);
                this._ToastrService.success('Edit Successfully');
                this.getCategories();
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete() {},
    });
  }

  deleteCat(id: any, item: ICategories): void {
    const dialogRef = this.dialog.open(DeleteChoosenItemComponent, {
      data: { text: 'Category', deleteItem: item.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Delete category');
      // console.log(result);

      this._CategoriesService.deleteCategory(id).subscribe({
        next: (res) => {
          console.log(res);
          this.getCategories();
          this._ToastrService.success('Deleted Successfully');
        },
        error: (err) => {
          console.log(err);
        },
      });
      // this.getCategories();
    });
  }
}
