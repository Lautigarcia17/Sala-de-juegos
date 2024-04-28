import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  
  saveDataUser(name: string) : void{
    let data : object = {
      "name" : name,
      "time" :  this.generateCurrentDate(),
    }
    localStorage.setItem("user",JSON.stringify(data));
    localStorage.setItem("stateLogin","true");
  }

  private readDataUser() 
  {
    let data  = localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user") as string) : "";
    return data;
  }


  private generateCurrentDate() :  string
  {
    let date : Date = new Date();
    return date.toLocaleString() 
  }

  get currentUser() : string
  {
    return this.readDataUser()['name'];
  }

  get currentDate() : string
  {
    return this.readDataUser()['time'];
  }

  get stateLogin() : boolean
  {
    return localStorage.getItem("stateLogin") != null ? true : false;
  }


}
