import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { RecipesService } from './../../../admin/recipes/services/recipes.service';
import { Component } from '@angular/core';
import { UserSideService } from '../../services/user-side.service';
import { Ifav } from '../../interfaces/ifav';
import { PageEvent } from '@angular/material/paginator';
import { ICategories } from 'src/app/admin/categories/interfaces/icategories';
import { Ipagnator } from 'src/app/admin/categories/interfaces/ipagnator';
import { IRecipes } from 'src/app/admin/recipes/interfaces/irecipes';
import { ITags } from 'src/app/admin/recipes/interfaces/itags';
import { ViewUserRecipeComponent } from '../view-user-recipe/view-user-recipe.component';
import { DeleteChoosenItemComponent } from 'src/app/shared/delete-item/delete-choosen-item/delete-choosen-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-fav',
  templateUrl: './user-fav.component.html',
  styleUrls: ['./user-fav.component.scss'],
})
export class UserFavComponent {
  constructor(
    private _UserSideService: UserSideService,
    private _RecipesService: RecipesService,
    private _CategoriesService: CategoriesService,
    public dialog: MatDialog,
    private _ToastrService: ToastrService
  ) {}

  listFav: Ifav[] = [];

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
    this.getFavs();
    this.getAllTags();
    this.getCategories();
  }

  listTags: ITags[] = [];

  getAllTags() {
    this._RecipesService.getAllTags().subscribe({
      next: (res) => {
        // console.log(res);
        this.listTags = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  categoryId: string = 'None';
  tagId: string = 'None';

  getFavs() {
    this._UserSideService.getAllFav().subscribe({
      next: (res) => {
        console.log(res);
        this.listFav = res.data;
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
        // console.log(res);
        this.listCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    // console.log(e);
    // this.pageEvent = e;
    this.pagnator.length = e.length;
    this.pagnator.pageSize = e.pageSize;
    this.pagnator.pageNumber = e.pageIndex + 1;
    this.getFavs();
  }

  openView(item: Ifav): void {
    // const dialogRef = this.dialog.open(DeleteChoosenItemComponent, {
    //   data: {
    //     item: item,
    //     url: this.url,
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log('dlete fav');
    // });
  }

  deleteFav(item: Ifav) {
    console.log(item);
    const dialogRef = this.dialog.open(DeleteChoosenItemComponent, {
      data: {
        text: 'Favourite',
        deleteItem: item.recipe.name,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('dlete fav');

      this._UserSideService.onDeleteFav(item.id).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success('Deleted Successfully');
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error('Erorr on Deleted');
        },
      });
    });
  }
}
