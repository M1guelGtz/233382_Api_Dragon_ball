import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Transformation {
  id: number;
  name: string;
  ki: string;
  image: string;
  // Otras propiedades según lo que devuelva tu API
}

@Injectable({
  providedIn: 'root',
})
export class TransformationsService {
  private apiUrl = 'https://dragonball-api.com/api/transformations/';

  constructor(private http: HttpClient) {}

  getTransformations(): Observable<Transformation[]> {
    return this.http.get<Transformation[]>(this.apiUrl);
  }

  getTransformationsById(id: number): Observable<Transformation> {
    return this.http.get<Transformation>(this.apiUrl + id);
  }
}
