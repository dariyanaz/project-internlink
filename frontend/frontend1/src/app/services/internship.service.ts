import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Internship } from '../models/internship.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/internships`;

  getInternships(): Observable<Internship[]> {
    return this.http.get<Internship[] | { results: Internship[] }>(`${this.apiUrl}/`).pipe(
      map((response) => {
        console.log('RAW INTERNSHIPS RESPONSE:', response);

        if (Array.isArray(response)) {
          return response;
        }

        return response.results ?? [];
      })
    );
  }

  getInternshipById(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.apiUrl}/${id}/`);
  }
}