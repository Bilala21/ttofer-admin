import { TeamMemberService } from "@/services/team.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
})
export class TeamMngComponent implements OnInit {
  constructor(private teamMemberService: TeamMemberService, private toastr: ToastrService) { }
  title = "Team Management"
  loading: boolean = true
  data = { title: `${this.title} Table` }
  breadCrumbData = { title: 'Ads', subTitle: this.title }
  list: any = []

  editData: any = null
 
  isDeleteModal: boolean = false
  ids: any = []

  columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ];

  getTeamMember = (url: string) => {
    this.loading = true;
    this.teamMemberService.getTeamMember(url).subscribe({
      next: (data: any) => {
        this.loading = false;
        console.log(data.data);
        const reports = data.data.map((member: any) => ({
          id: member.id,
          name: member.name,
          email: member.email,
          role: member.user_type
        }))
        this.list = reports
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
  editRecord(item: any) {
    console.log(item);
  }

  detailView(item: any) {
    console.log(item,"item");
    this.editData = item
  }

  hideModal() {
    this.isDeleteModal = false
    this.editData = null
    this.ids = []
  }

  confirmDelete() {
    this.teamMemberService.deleteTeamMember(this.ids?.join()).subscribe({
      next: (res: any) => {
        this.getTeamMember("get/team/member")
        this.toastr.success(res?.message);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Reposts Not Deleted successfully.");
      }
    });
    this.isDeleteModal = false
  }

  deleteElement(ids: any) {
    this.isDeleteModal = true
    this.ids = ids
  }

  ngOnInit(): void {
    this.getTeamMember("get/team/member")
  }
}


