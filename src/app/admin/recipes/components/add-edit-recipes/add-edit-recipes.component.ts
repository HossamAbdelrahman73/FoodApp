import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategories } from 'src/app/admin/categories/interfaces/icategories';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { IRecipes } from '../../interfaces/irecipes';
import { ITags } from '../../interfaces/itags';
import { RecipesService } from '../../services/recipes.service';
import { Ipagnator } from 'src/app/admin/categories/interfaces/ipagnator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss'],
})
export class AddEditRecipesComponent {
  constructor(
    public dialog: MatDialog,
    private _CategoriesService: CategoriesService,
    private _RecipesService: RecipesService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private route: ActivatedRoute
  ) {}

  pagnator: Ipagnator = {
    length: 0,
    pageNumber: 1,
    pageSize: 5,
  };

  searchName: string = '';

  responseRecipes: any;
  listRecipes: IRecipes[] = [];

  id: any;
  editValueForm!: IRecipes;

  jj: string = '';
  ngOnInit(): void {
    this.getRecipes();
    this.getAllTags();
    this.getCategories();
    console.log(this.id);
  }

  recipeForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    tagId: ['', [Validators.required]],
    categoriesIds: ['', [Validators.required]],
  });

  // categoriesIds: any = new FormControl('', Validators.required);

  sendData() {
    console.log(this.recipeForm);
    let entries = Object.entries(this.recipeForm.value);

    let myDate = new FormData();

    entries.forEach((entry) => {
      myDate.append(`${entry[0]}`, `${entry[1]}`);
    });
    // myDate.append('categoriesIds', this.categoriesIds);
    this._RecipesService.createRecipe(myDate).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['/dashboard/admin/recipes']);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // myDate.append('profileImage', this.imgSrc);
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

  categoryId: string = '';
  TagId: string = '2';

  getRecipes() {
    this._RecipesService
      .getAllRecipes(
        this.pagnator.pageSize,
        this.pagnator.pageNumber,
        this.searchName,
        '',
        ''
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

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
