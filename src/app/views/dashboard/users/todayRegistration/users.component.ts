import { UserService } from "@/services/user.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "register-users",
  templateUrl: "./register-users.component.html",
})
export class RegisterUserComponent implements OnInit {
  constructor(private userService: UserService, private toastr: ToastrService) { }
  loading = false
  title = "Today’s Registration"
  list: any = []
  data = { title: `${this.title} Table` }
  breadCrumbData = { title: 'Users', subTitle: this.title }

  viewData: any = null
  showModal: boolean = false
  isDeleteModal: boolean = false
  ids: any = []

  columns = [
    { key: 'checkbox', header: 'Check box' },
    { key: 'id', header: 'User ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'created_at', header: 'Registration date' },
    { key: 'status', header: 'Status' },
    { key: 'verify_status', header: 'Verify Status' }
  ];

  getUser = (url: string) => {

    this.loading = true;
    this.userService.getUsers(url).subscribe({
      next: (data: any) => {
        this.loading = false;
        const users = data.data.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: dateTimeFormat(user.created_at, "MM-DD-YYYY:hh:m A"),
          status: user.status ? "Active" : "In-active",
          verify_status: "Varified"
        }))
        this.list = users
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  searchFillter(query: any) {
    if (query.search) {
      this.getUser(`users/search?search=${query.search}`)
    }
  }
  detailView(item: any) {
    this.viewData = item
  }

  hideModal() {
    this.isDeleteModal = false
    this.viewData = null
    this.ids = []
  }

  confirmDelete() {
    this.userService.deleteUser(this.ids).subscribe({
      next: (res: any) => {
        this.getUser("users")
        this.toastr.success(res?.message);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Users Not Deleted successfully.");
      }
    });
    this.isDeleteModal = false
  }

  bulkDeleteUser(ids: any) {
    this.isDeleteModal = true
    this.ids = ids
  }
  ngOnInit(): void {
    this.getUser("today-registration")
  }
}
