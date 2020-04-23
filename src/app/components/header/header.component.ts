import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { User } from '../../core/auth/user';

export type MenuDropDown = {
  label: string;
  routerLink?: string;
  fn?: () => void;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropDownItems: MenuDropDown[];
  isInAdminView: boolean;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    const url = this.router.url;
    this.isInAdminView = url.indexOf('admin/') > -1;

    this.authService.getUser().then((user: User) => {
      const isAdmin = user.role === 'admin';
      this.dropDownItems = [
        {label: 'Edit Profile', routerLink: '/'},
        {label: 'Preferences', routerLink: '/'},
        isAdmin ? {label: `Go to ${this.isInAdminView ? 'User' : 'Admin'} View`, fn: this.toggleUserViews} : undefined,
        {label: 'Logout', fn: this.logout}
      ].filter(item => item !== undefined);
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
