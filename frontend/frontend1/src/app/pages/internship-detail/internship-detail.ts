import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { InternshipService } from '../../services/internship.service';
import { ApplicationService } from '../../services/application.service';
import { Internship } from '../../models/internship.model';


@Component({
  selector: 'app-internship-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent],
  templateUrl: './internship-detail.html',
  styleUrl: './internship-detail.css'
})
export class InternshipDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private internshipService = inject(InternshipService);
  private applicationService = inject(ApplicationService);
  private cdr = inject(ChangeDetectorRef);

  internship: Internship | null = null;
  loading = true;
  error = '';

  coverLetter = '';
  applyLoading = false;
  applySuccess = '';
  applyError = '';

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = Number(rawId);

    console.log('RAW ID:', rawId);
    console.log('INTERNSHIP ID:', id);

    if (!rawId || Number.isNaN(id)) {
      this.error = 'Invalid internship ID.';
      this.loading = false;
      return;
    }

    this.internshipService.getInternshipById(id).subscribe({
      next: (data) => {
        console.log('INTERNSHIP DATA:', data);
        this.internship = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('DETAIL ERROR:', err);
        console.log('DETAIL ERROR BODY:', err?.error);
        this.error = 'Failed to load internship details.';
        this.loading = false;
      }
    });
  }

  getCompanyName(): string {
    if (!this.internship) return 'Company';

    const company = this.internship.company;

    if (typeof company === 'object' && company !== null && 'name' in company) {
      return String(company.name);
    }

    return String(company || 'Company');
  }

  applyNow(): void {
    if (!this.internship) return;

    this.applySuccess = '';
    this.applyError = '';
    this.applyLoading = true;

    this.applicationService.createApplication({
      internship: this.internship.id,
      cover_letter: this.coverLetter || 'I am interested in this internship.'
    }).subscribe({
      next: () => {
        this.applyLoading = false;
        this.applySuccess = 'Application submitted successfully!';
        this.coverLetter = '';
      },
      error: (err) => {
        console.log('APPLICATION ERROR:', err);
        this.applyLoading = false;
        this.applyError =
          err?.error?.internship?.[0] ||
          err?.error?.detail ||
          'Failed to submit application.';
      }
    });
  }
}