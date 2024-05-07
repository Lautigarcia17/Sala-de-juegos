import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http : HttpClient) { }

  generateWord(){
    return this.http.get('https://clientes.api.greenborn.com.ar/public-random-word');
  }
}
