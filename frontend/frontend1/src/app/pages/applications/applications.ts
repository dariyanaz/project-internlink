import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf, DatePipe, NgClass } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe, NgClass, NavbarComponent],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class ApplicationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);

  applications: Application[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.error = '';

    this.applicationService.getMyApplications().subscribe({
      next: (data) => {
        console.log('APPLICATIONS DATA:', data);
        this.applications = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('LOAD APPLICATIONS ERROR:', err);
        console.log('LOAD APPLICATIONS ERROR BODY:', err?.error);

        this.error =
          err?.error?.detail ||
          err?.message ||
          'Failed to load applications.';
        this.loading = false;
      }
    });
  }

  deleteApplication(id: number): void {
    this.applicationService.deleteApplication(id).subscribe({
      next: () => {
        this.applications = this.applications.filter((app) => app.id !== id);
      },
      error: (err) => {
        console.log('DELETE APPLICATION ERROR:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'Failed to delete application.';
      }
    });
  }

  getStatusClass(status?: string): string {
    const value = (status || '').toLowerCase();

    if (value === 'accepted') return 'accepted';
    if (value === 'rejected') return 'rejected';
    return 'pending';
  }
}