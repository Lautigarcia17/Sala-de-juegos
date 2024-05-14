import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { CardsService } from '../../../services/cards.service';
import { Card } from '../../../classes/card';



@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export default class MayorOMenorComponent implements OnInit,OnDestroy {
  cardSubscription!: Subscription;
  viewCard!: boolean;
  stateStart!: boolean;
  score!: number;
  messageResult!: string;
  deckCards!: Card[];

  constructor(private cards: CardsService, private location: Location) {}

  ngOnInit(): void {
    this.start();
  }

  start() : void{
    let btnHigher: HTMLElement = document.getElementById('btn-higher') as HTMLElement;
    let btnLower: HTMLElement = document.getElementById('btn-lower') as HTMLElement;
    if (btnHigher && btnLower) {
      this.disableButton(false);
    }
    this.setValuesDefault()
    this.createCard();
  }

  createCard() : void{
    const consult = this.cards.generateCard();
    this.cardSubscription = consult.subscribe((cards: any) => {
      this.deckCards = cards;
    }),
      (error: any) => {
        console.error('Subscription error:', error);
      },
      () => {
        console.log('Subscription completed.');
      }

  }



  compareCards(response: string) : void{
    this.viewCard = true;
    let cardOne: number = this.deckCards[0].getNumberOfCard();
    let cardTwo: number = this.deckCards[1].getNumberOfCard();


    if ((response == "mayor" && cardTwo < cardOne) || (response == "menor" && cardTwo > cardOne)) {
      this.messageResult = 'Perdiste, Vuelve a intentarlo !';
      this.stateStart = false;
      this.disableButton(true);
    }
    else{
      if (cardOne === cardTwo) {
        this.messageResult = "Es la misma";
      }
      else{
        this.messageResult = `es ${response},Ganaste!`;
      }

      this.score++;
      if(this.deckCards.length == 2){ /* Complete the entire deck*/
        this.messageResult = 'Felicidades, completaste toda la baraja!';
        this.stateStart = false;;
      }
      else{
        this.viewCard = false;
        this.deckCards.shift();
      }

    }
  }




  setValuesDefault() : void{
    this.stateStart = true;
    this.viewCard = false;
    this.messageResult = '';
    this.score = 0;
    this.deckCards = [];
  }



  disableButton(state : boolean) : void{
    if (document.getElementById('btn-option')) {
      const div : HTMLElement = document.getElementById('btn-option') as HTMLElement;
      const buttons: HTMLCollectionOf<HTMLButtonElement> = div.getElementsByTagName('button');
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].disabled = state;
      }
    }
  }



  goBack() : void{
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }
  }
}
