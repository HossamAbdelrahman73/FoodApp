import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from 'src/app/admin/categories/components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from 'src/app/admin/categories/components/view-category/view-category.component';
import { ICategories } from 'src/app/admin/categories/interfaces/icategories';
import { Ipagnator } from 'src/app/admin/categories/interfaces/ipagnator';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { IRecipes } from 'src/app/admin/recipes/interfaces/irecipes';
import { ITags } from 'src/app/admin/recipes/interfaces/itags';
import { RecipesService } from 'src/app/admin/recipes/services/recipes.service';
import { DeleteChoosenItemComponent } from 'src/app/shared/delete-item/delete-choosen-item/delete-choosen-item.component';
import { ViewUserRecipeComponent } from '../view-user-recipe/view-user-recipe.component';
import { UserSideService } from '../../services/user-side.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss'],
})
export class UserRecipesComponent {
  constructor(
    public dialog: MatDialog,
    private _CategoriesService: CategoriesService,
    private _RecipesService: RecipesService,
    private _UserSideService: UserSideService,
    private _ToastrService: ToastrService
  ) {}

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

  openView(id: number, item: IRecipes): void {
    const dialogRef = this.dialog.open(ViewUserRecipeComponent, {
      data: {
        item: item,
        url: this.url,
        cat: item.category
          .map((rec) => {
            return rec.name;
          })
          .join(' ,'),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Add category');
    });
  }

  addFav(id: number) {
    this._UserSideService.onAddFav(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success('Added To Favourite');
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message);
      },
    });
  }
}
