import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../classes/card';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http : HttpClient) { }

  generateCard() : Observable<Card[]>{
    return this.http.get<Card[]>('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
    .pipe(map( (response : any) => {
      if (response.cards && response.cards.length > 0) {
        return response.cards.map((card: any) => 
          new Card(card.value + ' ' + card.suit, card.value, card.image));
      } else {
        return [];
      }


    }))
  }

}
