import { NotificationService } from "@/services/notification.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.html",
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationService: NotificationService) { }
  title = "Notifications"
  loading: boolean = true
  data: any = []

  isDeleteModal: boolean = false

  columns = [
    { key: 'id', header: 'Id' },
    { key: 'text', header: 'Comment' },
    { key: 'status', header: 'Status' },
    { key: 'created_at', header: 'Created At' },
  ];


  editRecord(item: any) {
    console.log(item);
  }

  detailView(item: any) {

  }

  hideModal() {

  }

  confirmDelete() {
    // this.teamMemberService.deleteTeamMember(this.ids?.join()).subscribe({
    //   next: (res: any) => {
    //     this.getTeamMember("get/team/member")
    //     this.toastr.success(res?.message);
    //   },
    //   error: (error: any) => {
    //     console.error('Error:', error);
    //     this.toastr.error("Reposts Not Deleted successfully.");
    //   }
    // });
    // this.isDeleteModal = false
  }

  deleteElement(ids: any) {
    // this.isDeleteModal = true
    // this.ids = ids
  }
  getNotifications = (url: string) => {
    this.notificationService.getNotification(url).subscribe({
      next: (data: any) => {
        this.data=data?.data
        this.loading=false
      },
      error: (error: any) => console.error("Error:", error),
    });
  };

  ngOnInit(): void {
    this.getNotifications("unread/notifications");
  }
}


