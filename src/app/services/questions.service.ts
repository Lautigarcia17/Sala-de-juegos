import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  generateQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>("../../assets/data/questions.json").pipe(
      map(questions => {
        questions = this.shuffleArray(questions);
        return questions.map(question => {
          return {
            ...question,
            answers: this.shuffleArray(question.answers)
          };
        });
      })
    );
  }

  private shuffleArray(array: any[]): any[] {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}
