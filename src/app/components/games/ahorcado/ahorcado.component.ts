import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordsService } from '../../../services/words.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export default class AhorcadoComponent implements OnInit,OnDestroy{
  letters: any;
  buttonDisabled!: boolean[];
  consultWords! : Subscription;
  word! : string;
  wordHidden! : string;
  attemps! : number;
  win! : boolean;
  lost! : boolean;
  invalidLetters! : string;

  constructor(private genWord : WordsService, private location: Location){}

  ngOnInit(): void {
    this.setValuesDefault();
    this.startGame();
    this.loadButtonDisabled();
  }

  startGame() : void
  {
    const consult = this.genWord.generateWord();
    this.loadButtonDisabled();
    
    this.consultWords = consult.subscribe((responseWord : string)=>{
      this.word =  this.removeAccents(responseWord).toUpperCase();;
      this.wordHidden = "_ ".repeat(this.word.length);
    })
  }

  retry() : void
  {
    this.setValuesDefault();
    this.startGame();
  }

  verifyLetter(letter : string, index : number) : void {
    this.buttonDisabled[index] = true;
    if(this.existsLetter(letter))
    {
      const arrayWordHidden = this.wordHidden.split(" ");

      for (let i = 0; i <= this.word.length; i++) {
        if (this.word[i] === letter) {
          arrayWordHidden[i] = letter;
        }
      }
      this.wordHidden = arrayWordHidden.join(" ");
    }
    this.verifyWinner();

  }
  verifyWinner() : void{
    const wordArray = this.wordHidden.split(" ");
    const wordToEvaluate = wordArray.join("");

    if (wordToEvaluate === this.word) {
      this.win = true;
    }
    if (this.attemps === 5) {
      this.lost = true;
    }
  }

  existsLetter(letter : string) : boolean{
    let exists  = true;

    if (this.word.indexOf(letter) < 0) { // dont exist the letter
      this.attemps++;
      this.invalidLetters += letter +" ";
      exists = false
    } 
    return exists;
  }

  loadButtonDisabled() : void{
    this.buttonDisabled = new Array(this.letters.length).fill(false);
  }

   removeAccents(word: string): string {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  setValuesDefault() : void{
    this.letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.attemps = 0;
    this.win = false;
    this.lost = false;
    this.invalidLetters = '';
    this.buttonDisabled = [];
  }

  goBack() : void{
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.consultWords) {
      this.consultWords.unsubscribe();
    }
  }

}
