import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Message } from '../interfaces/message';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private stateLogin: boolean;
  private arrayMessages! : Message[];


  constructor(localstorage: LocalStorageService, database : DatabaseService) {
    this.stateLogin = localstorage.stateLogin;

    database.getMessages()
    .subscribe( (response : Message[]) => {
      this.arrayMessages = [];
      for(let message of response)
      {
        this.arrayMessages.push(message);
      }
    })

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

  getMessages() : Message[]{
    return this.arrayMessages;
  }

}
