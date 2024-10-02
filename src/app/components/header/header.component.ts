import { MessageService } from "@/services/messages.service";
import { NotificationService } from "@/services/notification.service";
import { ReportService } from "@/services/report.service";
import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  notifications: any = [];
  messages: any = [];
  reports: any = [];
  notCount: number = 0;
  msgCount: number = 0;
  reportCount: number = 0;
  toggleType: string = "";
  notV: string = "text";
  msgV: string = "message";
  rptV: string = "note";
  load_more: boolean = false;


  // Add index signature to allow dynamic key access
  [key: string]: any;

  constructor(
    private messageService: MessageService,
    private reportService: ReportService,
    private notificationService: NotificationService
  ) { }

  private handleResponse(data: any, countKey: keyof HeaderComponent, itemsKey: keyof HeaderComponent) {
    this[itemsKey] = data?.data || [];
    this.load_more = false;
    this[countKey] = data?.data?.last_page === 1 ? data?.data?.total : data?.data?.last_page === data?.data?.current_page ? 0 : (data?.data?.current_page == 1 ? data?.data?.total : (data?.data?.total - data?.data?.to));
  }


  getMessages = (url: string) => {
    this.messageService.getMessages(url).subscribe({
      next: (data: any) => this.handleResponse(data, "msgCount", "messages"),
      error: (error: any) => console.error("Error:", error),
    });
  };

  getReports = (url: string) => {
    this.reportService.getReports(url).subscribe({
      next: (data: any) => this.handleResponse(data, "reportCount", "reports"),
      error: (error: any) => console.error("Error:", error),
    });
  };

  getNotifications = (url: string) => {
    this.notificationService.getNotification(url).subscribe({
      next: (data: any) =>
        this.handleResponse(data, "notCount", "notifications"),
      error: (error: any) => console.error("Error:", error),
    });
  };

  handleToggle(type: any, count: number) {
    this.toggleType = this.toggleType === type ? "" : type;
    if (count < 10) {
      this[type] = 0
    }
  }

  loadMore(current_page: number) {
    this.getNotifications(`unread/notifications?page=${current_page + 1}`);
    this.load_more = true;
  }

  handleLinkClick() {
    this.toggleType = "";
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("icon")) {
      this.toggleType = "";
    }
  }

  ngOnInit() {
    this.getMessages("latest-messages");
    this.getReports("reports");
    this.getNotifications("unread/notifications");
  }
}
