import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  breadcrumbs = [
    { text: 'Home', link: '/' },
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'User', link: '' }
  ];
}
