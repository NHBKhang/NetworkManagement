import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private apiUrl = 'http://localhost:5000/api/network';

  constructor(private http: HttpClient) { }

  getNetworkStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
