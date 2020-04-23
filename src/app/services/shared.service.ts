import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isViewingAsAdmin = false;

  constructor() { }

  getIsViewingAsAdmin(): boolean {
    return this.isViewingAsAdmin;
  }

  setIsViewingAsAdmin(value: boolean): void {
    this.isViewingAsAdmin = value;
  }
}
