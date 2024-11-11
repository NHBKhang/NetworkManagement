import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpeedTestService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Fetch network speed data
  getNetworkSpeed(): Observable<NetworkSpeedData> {
    return this.http.get<NetworkSpeedData>(`${this.baseUrl}/network/speed`).pipe(
      catchError(this.handleError<NetworkSpeedData>('getNetworkSpeed', { downloadSpeed: 0, uploadSpeed: 0, ping: 0 }))
    );
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

// Define the structure of the network speed data
export interface NetworkSpeedData {
  downloadSpeed: number; // in Mbps
  uploadSpeed: number;   // in Mbps
  ping: number;          // in ms
}
