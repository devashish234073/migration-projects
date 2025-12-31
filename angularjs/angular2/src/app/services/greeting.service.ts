import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GreetingResponse {
  message: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  constructor(private http: HttpClient) { }

  getGreeting(name: string): Observable<GreetingResponse> {
    return this.http.get<GreetingResponse>(
      'http://localhost:3000/api/greeting',
      { params: { name } }
    );
  }
}
