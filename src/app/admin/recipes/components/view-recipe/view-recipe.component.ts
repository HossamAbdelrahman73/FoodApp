import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ICategories } from 'src/app/admin/categories/interfaces/icategories';
import { Ipagnator } from 'src/app/admin/categories/interfaces/ipagnator';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { IRecipes } from '../../interfaces/irecipes';
import { ITags } from '../../interfaces/itags';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent {
  constructor(
    public dialog: MatDialog,
    private _CategoriesService: CategoriesService,
    private _RecipesService: RecipesService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private route: ActivatedRoute
  ) {
    // this.getRecipes();
    this.getAllTags();
    this.getCategories();
  }

  url: string = 'https://upskilling-egypt.com:3006/';

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

  categoryVal: any;
  tagVal: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
    });
    this._RecipesService.getSingleRecipe(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.editValueForm = res;
        this.recipeForm.get('name')?.setValue(`${this.editValueForm.name}`);
        this.recipeForm
          .get('description')
          ?.setValue(`${this.editValueForm.description}`);
        // debugger;
        this.recipeForm.get('price')?.setValue(`${this.editValueForm.price}`);
        this.recipeForm.get('tagId')?.setValue(this.editValueForm.tag.id);
        // this.TagId = JSON.stringify(this.editValueForm.tag.id);
        // this.tagVal = this.editValueForm.tag.name; //////$$$$$$$$
        console.log(this.TagId);

        // this.categoryVal = this.editValueForm.category
        //   .map((res) => {
        //     return res.name;
        //   })
        //   .join(',');

        this.recipeForm
          .get('categoriesIds')
          ?.setValue(this.editValueForm.category.map((value: any) => value.id));
      },
      error: (err) => {
        console.log(err);
      },
    });

    console.log(this.id);
  }

  recipeForm: FormGroup = this._FormBuilder.group({
    name: [{ value: '', disabled: true }, [Validators.required]],
    description: [{ value: '', disabled: true }, [Validators.required]],
    price: [{ value: '', disabled: true }, [Validators.required]],
    tagId: [{ value: '', disabled: true }, [Validators.required]],
    categoriesIds: [{ value: '', disabled: true }, [Validators.required]],
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
    this._RecipesService.updateRecipe(this.id, myDate).subscribe({
      ////  edit%%%%%%%%
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

  // getRecipes() {
  //   this._RecipesService
  //     .getAllRecipes(
  //       this.pagnator.pageSize,
  //       this.pagnator.pageNumber,
  //       this.searchName,
  //       '',
  //       ''
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.listRecipes = res.data;
  //         this.responseRecipes = res;
  //         this.pagnator.pageNumber = res.pageNumber;
  //         this.pagnator.pageSize = res.pageSize;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }

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
