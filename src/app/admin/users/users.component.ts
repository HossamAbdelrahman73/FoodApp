import { UsersService } from './service/users.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from '../categories/components/add-edit-category/add-edit-category.component';
import { DeleteCategoryComponent } from '../categories/components/delete-category/delete-category.component';
import { ViewCategoryComponent } from '../categories/components/view-category/view-category.component';
import { ICategories } from '../categories/interfaces/icategories';
import { Ipagnator } from '../categories/interfaces/ipagnator';
import { CategoriesService } from '../categories/services/categories.service';
import { IRecipes } from '../recipes/interfaces/irecipes';
import { ITags } from '../recipes/interfaces/itags';
import { RecipesService } from '../recipes/services/recipes.service';
import { IUsers } from './interfaces/iusers';
import { ControlContainer } from '@angular/forms';
import { DeleteChoosenItemComponent } from 'src/app/shared/delete-item/delete-choosen-item/delete-choosen-item.component';
import { ToastrService } from 'ngx-toastr';
import { ViewUsersComponent } from './components/view-users/view-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  constructor(
    public dialog: MatDialog,
    private _CategoriesService: CategoriesService,
    private _ToastrService: ToastrService,
    private _UsersService: UsersService
  ) {}

  url: string = 'https://upskilling-egypt.com:3006/';
  listUsers: IUsers[] = [];
  length: number = 0;
  pageNumber: number = 1;
  pageSize: number = 5;
  groups: number[] = [1, 2];
  searchName: string = '';
  searchEmail: string = '';
  searchCountry: string = '';
  responseUsers: any;
  role: string = 'None';
  searchMethod: string = 'UserName';

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    console.log(this.groups);
    let parms = {
      userName: this.searchName,
      email: this.searchEmail,
      country: this.searchCountry,
      groups: this.groups,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };

    this._UsersService.getUsers(parms).subscribe({
      next: (res) => {
        console.log(res);
        this.responseUsers = res;
        this.listUsers = res.data;
        // this.pageNumber = res.pageNumber;
        // this.pageSize = res.pageSize;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearInputs() {
    this.searchCountry = '';
    this.searchEmail = '';
    this.searchName = '';
    this.searchMethod = 'UserName';
    this.groups = [1, 2];
    this.getAllUsers();
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getAllUsers();
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
            this.getAllUsers();
          },
          error: (err) => {
            console.log(err);
          },
        });
        // this.getRecipes();
      }
    });
  }

  openView(id: number, item: IUsers): void {
    const dialogRef = this.dialog.open(ViewUsersComponent, {
      data: { item: item, url: this.url },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openEdit(id: number) {
    // let cat = '';
    // this._CategoriesService.getSingleCategory(id).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     // cat = res.name;
    //     // localStorage.setItem('cat', cat);
    //     const dialogRef = this.dialog.open(AddEditCategoryComponent, {
    //       data: { name: `${res.name}` },
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //       console.log('Edit Category');
    //       if (result) {
    //         console.log(result);
    //         this._CategoriesService.editCategory(id, result.name).subscribe({
    //           next: (res) => {
    //             console.log(res);
    //             this.getRecipes();
    //           },
    //           error: (err) => {
    //             console.log(err);
    //           },
    //         });
    //       }
    //     });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete() {},
    // });
  }

  deleteUser(id: any, item: IUsers): void {
    const dialogRef = this.dialog.open(DeleteChoosenItemComponent, {
      data: { text: 'User', deleteItem: item.userName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Delete category');

      this._UsersService.deleteUserbyId(id).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message);
          this.getAllUsers();
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}
