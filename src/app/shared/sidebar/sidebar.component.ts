import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';

interface IMenu {
  icon: string;
  url: string;
  text: string;
  Active: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private _AuthService: AuthService) {}

  isAdmin(): boolean {
    if (this._AuthService.getTokenInfo().role == 'SuperAdmin') {
      return true;
    } else {
      return false;
    }
  }
  isUser(): boolean {
    if (this._AuthService.getTokenInfo().role == 'SystemUser') {
      return true;
    } else {
      return false;
    }
  }

  menu: IMenu[] = [
    {
      icon: 'fa-house',
      url: `/dashboard/${this.isAdmin() ? 'admin/home' : 'user/home'}`,
      text: 'Home',
      Active: true,
    },
    {
      icon: 'fa-user-group',
      url: `/dashboard/admin/users`,
      text: 'Users',
      Active: this.isAdmin(),
    },
    {
      icon: 'fa-table-cells',
      url: `/dashboard/${this.isAdmin() ? 'admin/recipes' : 'user/recipe'}`,
      text: 'Recipes',
      Active: true,
    },
    {
      icon: 'fa-calendar-days',
      url: '/dashboard/admin/categories',
      text: 'Categories',
      Active: this.isAdmin(),
    },

    {
      icon: 'fa-heart',
      url: '/dashboard/user/fav',
      text: 'Fav',
      Active: this.isUser(),
    },
  ];
}
