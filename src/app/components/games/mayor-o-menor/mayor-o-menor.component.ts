import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { CardsService } from '../../../services/cards.service';



@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export default class MayorOMenorComponent implements OnDestroy{
  cardSubscription! : Subscription;
  flag! : boolean;
  viewCard! : boolean;
  stateStart! : boolean;
  score! : number;
  messageResult! : string;
  wonHand! : boolean;

  cardOne = {
    img : "",
    name : "",
    value : ""
  }
  cardTwo = {
    img : "",
    name : "",
    value : ""
  }



  constructor(private cards : CardsService, private location: Location){
    this.start();
  }





  start(){
    let btnHigher: HTMLElement = document.getElementById('btn-higher') as HTMLElement;
    let btnLower: HTMLElement = document.getElementById('btn-lower') as HTMLElement;
    if(btnHigher && btnLower){
      this.enableButtons();
    }
    this.setValuesDefault()
    this.createCard();
  }
    
  createCard()
  {
    const consult = this.cards.generateCard();
    this.cardSubscription = consult.subscribe((result : any)=>{
      
      console.log(result.cards[1])
      if(this.cardOne.value == "")
      {
        this.cardOne.img = result.cards[0].image;    
        this.cardOne.value = result.cards[0].value;
        this.cardOne.name = this.cardOne.value + " " + result.cards[0].suit; 
      }
      
      if(this.flag == false || this.cardTwo.value == "")
      {
        this.flag = true;
        this.cardTwo.value = result.cards[1].value;
        this.cardTwo.img = result.cards[1].image;    
        this.cardTwo.name = this.cardTwo.value + " " + result.cards[1].suit;   
      }
    }),
    (error : any) => {
      console.error('Subscription error:', error);
    },
    () => {
      console.log('Subscription completed.');
    }  

  }



  compareCards(response : string)
  {

    this.wonHand = true;
    this.viewCard = true;
    let cardOne =  !isNaN(parseInt(this.cardOne.value))  ? parseInt(this.cardOne.value) : this.isFigure(this.cardOne.value);
    let cardTwo =  !isNaN(parseInt(this.cardTwo.value))  ? parseInt(this.cardTwo.value) : this.isFigure(this.cardTwo.value);

    let continueGame = true;

    if (cardOne === cardTwo)
    {
      this.score++;
      this.messageResult = "Es la misma";
    }
    else{
      if((response == "mayor" && cardTwo > cardOne) || ( response == "menor" && cardTwo < cardOne ))
      {
        this.score++;
        this.messageResult = `es ${response},Ganaste!`;
      }
      else{
        this.messageResult = 'Perdiste, Vuelve a intentarlo !';
        this.stateStart = false;
        continueGame = false;
        this.wonHand = false;
        this.disableButtons();
      }        
    }
    
    if (continueGame) {
      this.viewCard = false;
      this.cardOne = {...this.cardTwo};
      this.clearCard(this.cardTwo);
      this.createCard();
    }

   

    

    
  }

  isFigure(figure : string) : number
  {
    let number = -1;
    switch(figure)
    {
      case "JACK":
        number = 11;
        break;
      case "QUEEN":
        number = 12;
        break;
      case "KING":  
        number = 13;
      break;
      case "ACE":
        number = 14;
      break;
    }
    return number;
  }

  clearCard(card : any)
  {
    card.name = "";
    card.img = "";
    card.value = "";
  }

  setValuesDefault(){
    this.flag = false;
    this.stateStart = true;
    this.viewCard = false;
    this.messageResult = '';
    this.score = 0;
    this.clearCard(this.cardOne);
    this.clearCard(this.cardTwo);
  }

  disableButtons(){
    let btnHigher : HTMLElement = document.getElementById('btn-higher') as HTMLElement;
    let btnLower : HTMLElement = document.getElementById('btn-lower') as HTMLElement;
    btnHigher.setAttribute('disabled','true');
    btnLower.setAttribute('disabled','true');
  }
  enableButtons(){
    let btnHigher : HTMLElement = document.getElementById('btn-higher') as HTMLElement;
    let btnLower : HTMLElement = document.getElementById('btn-lower') as HTMLElement;
    btnHigher.removeAttribute('disabled');
    btnLower.removeAttribute('disabled');
  }


  goBack(){
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }
  }
}
