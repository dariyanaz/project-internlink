import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { InternshipService } from '../../services/internship.service';
import { Internship } from '../../models/internship.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-internships',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, NavbarComponent],
  templateUrl: './internships.html',
  styleUrl: './internships.css'
})
export class InternshipsComponent implements OnInit {
  private internshipService = inject(InternshipService);
  private router = inject(Router);

  internships: Internship[] = [];
  filteredInternships: Internship[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  ngOnInit(): void {
    this.loadInternships();
  }

loadInternships(): void {
  console.log('LOAD INTERNSHIPS START');
  this.loading = true;
  this.error = '';

  this.internshipService.getInternships().subscribe({
    next: (data) => {
      console.log('INTERNSHIPS DATA:', data);
      this.internships = data;
      this.filteredInternships = data;
      this.loading = false;
    },
    error: (err) => {
      console.log('INTERNSHIPS ERROR:', err);
      console.log('INTERNSHIPS ERROR BODY:', err?.error);
      this.error = 'Failed to load internships from backend.';
      this.loading = false;
    },
    complete: () => {
      console.log('LOAD INTERNSHIPS COMPLETE');
    }
  });
}

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredInternships = this.internships;
      return;
    }

    this.filteredInternships = this.internships.filter((item) => {
      const companyName =
        typeof item.company === 'object' ? item.company.name?.toLowerCase() : '';

      return (
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        companyName.includes(term) ||
        item.location?.toLowerCase().includes(term)
      );
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/internships', id]);
  }

getCompanyName(internship: Internship): string {
  if (!internship.company) return 'Company';

  if (typeof internship.company === 'string') {
    return internship.company;
  }

  if (typeof internship.company === 'object' && internship.company !== null && 'name' in internship.company) {
    return String(internship.company.name);
  }

  return 'Company';
}

getCompanyLogo(internship: Internship): string {
  const name = this.getCompanyName(internship);
  return name ? name.charAt(0).toUpperCase() : 'I';
}

  getPostedDate(date?: string): string {
    if (!date) return 'Recently posted';
    return new Date(date).toLocaleDateString();
  }
}