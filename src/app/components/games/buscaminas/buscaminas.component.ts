import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscaminas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscaminas.component.html',
  styleUrl: './buscaminas.component.css'
})
export default class BuscaminasComponent implements OnInit{
  mines! : boolean[][];
  visibility! : boolean[][];
  counterNotMines! : number;
  score! : number;
  win! : boolean;
  lost! : boolean;
  stateStart! : boolean;
  higher! : boolean;

  constructor(private location: Location){}

  ngOnInit(): void {
    this.startGame()
  }

  startGame() : void{
    this.initializeVariables();
    this.setMines();
    this.setVisibility();    
  }


  isAMine(i : number, j : number) : void{ 
    if(this.mines[i][j]){
      this.showMines();
      this.score=0;
      this.lost = true;
    }
    else{
      this.score++;
      this.counterNotMines++;
      this.toggleBackground(i,j);
      this.win = this.verifyWinner();
    }

  }

  setMines() : void
  {
    this.mines = [];
    const bombProbability : number = 0.3;

    for (let i = 0; i < 10; i++) {
      this.mines[i] = [];
      for (let j = 0; j < 9; j++) {
        this.mines[i][j] = Math.random() < bombProbability;
      }
    }
  }
  setVisibility() : void
  {
    for (let i = 0; i < 10; i++) {
      this.visibility[i] = [];
      for (let j = 0; j < 9; j++) {
        this.visibility[i][j] = false;
      }
    }
  }


  showMines() : void
  {
    for (let i = 0; i < this.mines.length; i++) {
      for (let j = 0; j < this.mines[i].length; j++) {
        if (this.mines[i][j]) {
          this.visibility[i][j] = true;
        }
      }
    }
  }

  verifyWinner() : boolean
  {
    let buttonNotBombs = 0;
    for (let i = 0; i < this.mines.length; i++) {
      for (let j = 0; j < this.mines[i].length; j++) {
        if (this.mines[i][j] == false) {
          buttonNotBombs++;
        }
      } 
    }

    return buttonNotBombs == this.counterNotMines ? true : false;
  }


  initializeVariables() : void{
    this.mines = [];
    this.visibility = [];
    this.counterNotMines = 0;
    this.score = 0;
    this.win = false;
    this.lost = false;
    this.stateStart = false;
    this.higher = false;
  }

  
  toggleBackground(i: number, j: number): void {
    const button : any = document.getElementById(`${i}-${j}`);
    const minesClose = this.isMineClose(i,j);

    button.classList.toggle('clicked');
    button.disabled = true;
    button.textContent= minesClose == 0 ? "" : minesClose;
  }




  isMineClose(indexI: number, indexJ: number) : number{
    
    let minesClose : number = 0;

    for (let i = 0; i < this.mines.length; i++) {
      for (let j = 0; j < this.mines[i].length; j++) {

        if((i+1 == indexI  && ( j+1 == indexJ ||j == indexJ || j == indexJ + 1) ) && this.mines[i][j] == true) // LEFT SECTOR
        {
            minesClose++;
        }

        if((j+1 == indexJ && (i == indexI || i == indexI + 1 ) && this.mines[i][j] == true)) // TOP SECTOR
        {
          minesClose++;
        }

        if((i - 1 == indexI  && (j == indexJ || j == indexJ + 1) ) && this.mines[i][j] == true) // RIGHT SECTOR
        {
          minesClose++;
        }

        if((i == indexI  && (j == indexJ + 1) ) && this.mines[i][j] == true) // BOT SECTOR
        {
          minesClose++;
        }

      } 
    }

    return minesClose;
  }

  goBack() : void{
    this.location.back();
  }


}
