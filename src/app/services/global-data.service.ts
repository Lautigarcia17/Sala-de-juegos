import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private stateLogin: boolean;


  constructor(localstorage: LocalStorageService) {
    this.stateLogin = localstorage.stateLogin;
  }

  getStateLogin(): boolean {
    return this.stateLogin;
  }

  setStateLogin(state: boolean): void {
    this.stateLogin = state;
  }


  setLogout(): void {
    this.stateLogin = false;
    localStorage.clear()
  }


}
