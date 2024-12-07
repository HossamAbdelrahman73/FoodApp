import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from '../categories/components/add-edit-category/add-edit-category.component';
import { DeleteCategoryComponent } from '../categories/components/delete-category/delete-category.component';
import { ViewCategoryComponent } from '../categories/components/view-category/view-category.component';
import { ICategories } from '../categories/interfaces/icategories';
import { Ipagnator } from '../categories/interfaces/ipagnator';
import { CategoriesService } from '../categories/services/categories.service';
import { RecipesService } from './services/recipes.service';
import { IRecipes } from './interfaces/irecipes';
import { Xliff } from '@angular/compiler';
import { ITags } from './interfaces/itags';
import { DeleteChoosenItemComponent } from 'src/app/shared/delete-item/delete-choosen-item/delete-choosen-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  constructor(
    public dialog: MatDialog,
    private _CategoriesService: CategoriesService,
    private _RecipesService: RecipesService,
    private _ToastrService: ToastrService
  ) {}

  // selected: string = '';
  url: string = 'https://upskilling-egypt.com:3006/';
  pagnator: Ipagnator = {
    length: 0,
    pageNumber: 1,
    pageSize: 5,
  };

  searchName: string = '';

  responseRecipes: any;
  listRecipes: IRecipes[] = [];
  ngOnInit(): void {
    this.getRecipes();
    this.getAllTags();
    this.getCategories();
  }

  listTags: ITags[] = [];

  getAllTags() {
    this._RecipesService.getAllTags().subscribe({
      next: (res) => {
        console.log(res);
        this.listTags = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  categoryId: string = 'None';
  tagId: string = 'None';

  getRecipes() {
    this._RecipesService
      .getAllRecipes(
        this.pagnator.pageSize,
        this.pagnator.pageNumber,
        this.searchName,
        this.tagId,
        this.categoryId
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listRecipes = res.data;
          this.responseRecipes = res;
          this.pagnator.pageNumber = res.pageNumber;
          this.pagnator.pageSize = res.pageSize;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  listCategories: ICategories[] = [];
  getCategories() {
    this._CategoriesService.getAllCategories(2000, 1, '').subscribe({
      next: (res) => {
        console.log(res);
        this.listCategories = res.data;
        // this.pagnator.pageNumber = res.pageNumber;
        // this.pagnator.pageSize = res.pageSize;
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
    this.getRecipes();
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
            this.getRecipes();
          },
          error: (err) => {
            console.log(err);
          },
        });
        // this.getRecipes();
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
                this.getRecipes();
                this._ToastrService.success('Edit Successfully');
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

  deleteRecipe(id: any, item: IRecipes): void {
    const dialogRef = this.dialog.open(DeleteChoosenItemComponent, {
      data: { text: 'Recipe', deleteItem: item.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Delete category');
      // console.log(result);

      this._RecipesService.deleteRecipe(id).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success('Deleted Successfully');
          this.getRecipes();
        },
        error: (err) => {
          console.log(err);
        },
      });
      // this.getRecipes();
    });
  }
}
