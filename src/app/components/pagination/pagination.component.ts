import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() pages: any
  currentPage: number = 1;
  totalPages: number = 10; // Example: Total number of pages

  // Generate the array of pages dynamically based on the current page
  getPagesArray(): (number | string)[] {
    const pagesToShow = 3; // Number of pages to show before and after the current page
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, this.currentPage + 1);

    const pages: (number | string)[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
      pages.unshift(startPage - 1);
    }
    if (endPage < this.totalPages) {
      pages.push('...');
      pages.push(endPage + 1);
    }

    return pages;
  }

  // Function to go to a specific page
  goToPage(page: number | string): void {
    if (page === '...') return;
    this.currentPage = page as number;
  }

  // Function to go to the previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Function to go to the next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
