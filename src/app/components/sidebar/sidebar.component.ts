import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/auth/user';
import { Router } from '@angular/router';

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

  isInAdminView: boolean;
  adminMenus: NavItem[];
  userMenus: NavItem[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const url = this.router.url;
    this.isInAdminView = url.indexOf('admin/') > -1;

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

    this.setActiveMenuItem(url);
  }

  ngOnInit(): void {
  }

  setActiveMenuItem(currentUrl: string): void {
    const menuItems = this.isInAdminView ? this.adminMenus : this.userMenus;
    menuItems.map(item => { item.isActive = item.routerLink === currentUrl; });
  }

  onNavClick(item: NavItem, menus: NavItem[]): void {
    for (const menuItem of menus) {
      menuItem.isActive = false;
    }
    item.isActive = true;
  }
}
