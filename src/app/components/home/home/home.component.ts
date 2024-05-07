import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Game } from '../../../interfaces/game';
import { ChatComponent } from '../../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule,ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  percentageHeigth : string;
  percentageWidth : string;

  constructor(){
    this.percentageHeigth = '15%';
    this.percentageWidth = '15%';
  }

  games : Game[] =
  [
    { 
      path : "ahorcado", 
      name:"ahorcado", 
      description: "Se basa en adivinar una palabra, sabes cuantas letras tiene y tienes que ponerle letras. Puedes equivocarte 5 veces con las letras.", 
      img: "../../../assets/ahorcado/ahorcado.jpeg"
    },
    {
      path : "mayorOMenor", 
      name:"Mayor o Menor",
      description: "Un juego de cartas en el que a los jugadores se les presentan dos cartas y deben adivinar si la siguiente carta tendrá mayor o menor valor. El juego implica un elemento de estrategia y suerte.",
      img: "../../../assets/mayorOMenor/mayorOMenor.jpeg"
    },
    {
      path : "", 
      name:"Preguntados",
      description: "Un juego de preguntas en el que a los jugadores se les presentan preguntas y respuestas de opción múltiple. El objetivo es seleccionar la respuesta correcta para ganar puntos.",
      img: "../../../assets/preguntados/preguntados.jpeg"
    },
    {
      path : "", 
      name:"Buscaminas",
      description: "Tienes que limpiar el campo minado sin detonar ninguna mina. Obtén la puntuación más alta o descubre todas las celdas vacías.",
      img: "../../../assets/buscaminas/buscaminas.jpeg"
    }
  ]

  openChat() {
    this.percentageWidth = '100%';
    this.percentageHeigth = '94%';
  }

  onSidenavClosed() {
    this.percentageWidth = '15%';
    this.percentageHeigth = '15%';
  }

}
