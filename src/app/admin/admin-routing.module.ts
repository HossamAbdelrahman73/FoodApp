import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeAdminComponent },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./recipes/recipes.module').then((m) => m.RecipesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
  },

  // {
  //   path: 'categories',
  //   loadChildren: () =>
  //     import('./categories/categories.module').then((m) => m.CategoriesModule),
  // },{
  //   path: 'recipes',
  //   loadChildren: () =>
  //     import('./recipes/recipes.module').then((m) => m.RecipesModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
