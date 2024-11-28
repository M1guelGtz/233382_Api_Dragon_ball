import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransformationsService {
  private apiUrl = 'https://dragonball-api.com/api/transformations/';

  constructor(private http: HttpClient) {}

  getTransformations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getTransformationsById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + id);
  }
}
