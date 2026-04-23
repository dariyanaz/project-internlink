import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/applications`;

  getMyApplications(): Observable<Application[]> {
    return this.http
      .get<Application[] | { results: Application[] }>(`${this.apiUrl}/`)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          return response.results ?? [];
        })
      );
  }

  createApplication(data: { internship: number; cover_letter: string }): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/`, data);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}