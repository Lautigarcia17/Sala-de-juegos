import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http : HttpClient) { }

  generateCard(){
    return this.http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
  }

}
