import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http : HttpClient) { }

  generateWord() : Observable<string>{
    return this.http.get<string>('https://clientes.api.greenborn.com.ar/public-random-word')
    .pipe(map( (response : string) => {
      return response.length > 0 ? response[0] : '';
    }))


  }
}
