import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit{
  title = "angular-dashboard-page";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBodyId(event.urlAfterRedirects);
      }
    });
  }

  updateBodyId(url: string): void {
    const routeToBodyIdMap: { [key: string]: string } = {
      '/dashboard': 'dashboardPage',
      '/dashboard/messages': 'messagPpage',
      '/dashboard/ads/history': 'adsHistory',
    };
    const route = url.split('?')[0].split('#')[0];
    const bodyId = routeToBodyIdMap[route] || 'default-page';

    document.body.id = bodyId;
  }
}
