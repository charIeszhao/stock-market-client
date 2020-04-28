import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { User } from '../../core/auth/user';

export type MenuDropDown = {
  label: string;
  routerLink?: string;
  fn?: () => void;
  separator?: boolean;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropDownItems: MenuDropDown[];
  isAuthenticated: boolean;
  isInAdminView: boolean;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    const url = this.router.url;
    this.isInAdminView = url.indexOf('admin/') > -1;
    this.isAuthenticated = this.authService.isAuthenticated();

    this.authService.getUser().then((user: User) => {
      const isAdmin = user.role === 'admin';
      this.dropDownItems = [
        {label: 'Edit Profile', routerLink: '/'},
        {label: 'Preferences', routerLink: '/'},
        ... isAdmin ? [{label: `Go to ${this.isInAdminView ? 'User' : 'Admin'} View`, fn: this.toggleUserViews, separator: true}] : [],
        {label: 'Logout', fn: this.logout, separator: true}
      ];
    });
  }

  ngOnInit(): void {
  }

  onMenuClick(menu): void {
    if (menu.routerLink) {
      this.router.navigate([menu.routerLink]);
    } else if (menu.fn) {
      menu.fn.apply(this);
    }
  }

  toggleUserViews(): void {
    this.router.navigate([this.isInAdminView ? '/' : '/admin']);
  }

  logout(): void {
    this.authService.logout();
  }
}
