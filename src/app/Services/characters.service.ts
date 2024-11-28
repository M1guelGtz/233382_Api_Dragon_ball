import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';
import { PreCharacter } from '../interfaces/pre-character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private _http: HttpClient) { }

  characters: Character[] = []

  getCharacters(): Observable<PreCharacter>{
    return this._http.get<PreCharacter>("https://dragonball-api.com/api/characters")
  }

  getCharacterByID(id: number): Observable<any>{
    return this._http.get<any>("https://dragonball-api.com/api/characters/" +id)
  }
}
