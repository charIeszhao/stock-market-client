import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/auth/user';

export interface NavItem {
  label: string;
  routerLink: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: Promise<boolean>|null = null;
  resolveUserRole: (isAdmin: boolean) => void|null = null;

  adminMenus: NavItem[];
  userMenus: NavItem[];

  constructor(
    private authService: AuthService
  ) {
    this.isAdmin = new Promise<boolean>(resolve => {
      this.resolveUserRole = resolve;
    });

    this.adminMenus = [
      { label: 'Data Import', routerLink: '/admin/import', isActive: true},
      { label: 'Company Management', routerLink: '/admin/company', isActive: false},
      { label: 'Exchange Management', routerLink: '/admin/exchange', isActive: false},
      { label: 'Update IPO Details', routerLink: '/admin/ipo', isActive: false}
    ];

    this.userMenus = [
      { label: 'Home', routerLink: '/dashboard', isActive: true},
      { label: 'IPO Calendar', routerLink: '/ipo-calendar', isActive: false},
      { label: 'Comparison Charts', routerLink: '/compare', isActive: false}
    ];
  }

  ngOnInit(): void {
    this.authService.getUser().then((user: User) => {
      this.resolveUserRole(user.role === 'admin');
    });
  }

  onNavClick(item: NavItem, menus: NavItem[]): void {
    for (const menuItem of menus) {
      menuItem.isActive = false;
    }
    item.isActive = true;
  }
}
