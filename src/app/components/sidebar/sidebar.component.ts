import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  router: any = null
  constructor(private toastr: ToastrService) {
    this.router = inject(Router)
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  logout() {
    this.showSuccess("Your logout successfully")
    sessionStorage.removeItem("authToken")
    this.router.navigate(["/"])
  }
  isApproveOrRejeActive(): boolean {
    return this.router.url === '/dashboard/ads/approve-or-reje' || this.router.url.startsWith('/dashboard/ads/details?product_id=');
  }
  messageRoute(): boolean {
    return this.router.url === '/dashboard/messages' || this.router.url.startsWith('/dashboard/messages?id=');
  }

  ngOnInit() { }
}
