import { Component, OnDestroy } from '@angular/core';
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
export default class AhorcadoComponent implements OnDestroy{
  letters: any;
  buttonDisabled!: boolean[];
  consultWords! : Subscription;
  word! : string;
  wordHidden! : string;
  attemps! : number;
  win! : boolean;
  lost! : boolean;
  invalidLetters! : string;

  constructor(private genWord : WordsService, private location: Location){
    this.setValuesDefault();

    this.startGame();
    this.loadButtonDisabled();
  }

  startGame()
  {
    const consult = this.genWord.generateWord();
    this.loadButtonDisabled();
    
    this.consultWords = consult.subscribe((result : any)=>{
      let word = this.removeAccents(result[0]).toUpperCase();
      this.word =  word;
      this.wordHidden = "_ ".repeat(this.word.length);
      
      console.log(word);
    })
  }

  retry()
  {
    this.setValuesDefault();
    this.startGame();
  }

  verifyLetter(letter : string, index : number) {
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
  verifyWinner() {
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


  
  goBack(){
    this.location.back();
  }


  loadButtonDisabled(){
    this.buttonDisabled = new Array(this.letters.length).fill(false);
  }
   removeAccents(word: string): string {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  setValuesDefault(){
    this.letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.attemps = 0;
    this.win = false;
    this.lost = false;
    this.invalidLetters = '';
    this.buttonDisabled = [];
  }
  
  ngOnDestroy(): void {
    if (this.consultWords) {
      this.consultWords.unsubscribe();
    }
  }

}
