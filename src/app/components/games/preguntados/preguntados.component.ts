import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../../../interfaces/question';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export default class PreguntadosComponent implements OnInit,OnDestroy{
  questionSubscription! : Subscription;
  questions : Question[];
  stateStart : boolean;
  messageResult : string;
  score : number;

  constructor(private questionsService : QuestionsService, private location: Location){
    this.stateStart = false;
    this.messageResult = '';
    this.score = 0;
    this.questions = [];
  }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() : void{
    this.stateStart = true;
    this.messageResult = '';
    this.score = 0;
    this.disableButton(false);

    if(this.questions.length > 1)
    {
      this.questions.shift();
    }
    else{
      this.generateQuestions();
    }
  }

  generateQuestions() : void{
    const consult = this.questionsService.generateQuestions()
    this.questionSubscription = consult 
    .subscribe((arrayQuestions : Question[])  =>{
      this.questions = arrayQuestions;
      console.log(this.questions[0].correct_answer);
    })
  }

  verifyAnswer(answer : string) : void{
    if(answer == this.questions[0].correct_answer)
    {
      this.score++;
      this.questions.shift();
      if(this.questions.length == 0)
      {
        this.score = 0;
        this.messageResult = "Ganaste !! Completaste todas las preguntas";
      }
    }
    else{
      this.disableButton(true);
      this.messageResult = `Perdiste !! La respuesta correcta era ${this.questions[0].correct_answer}`;
      this.stateStart = false;
    }
    console.log(this.questions[0].correct_answer);
  }

  disableButton(state : boolean) : void{
    if (document.getElementById('answers')) {
      const div : HTMLElement = document.getElementById('answers') as HTMLElement;
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
    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
  }


}
