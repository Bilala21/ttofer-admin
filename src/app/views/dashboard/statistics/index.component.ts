import { ReportService } from "@/services/report.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
})
export class ReportsComponent implements OnInit {

  constructor(private reportService: ReportService, private toastr: ToastrService) { }
  title = "Reports"
  selectedIds = []
  loading: boolean = true
  tableData: any = {}
  data = { title: `${this.title} Table` }
  breadCrumbData = { title: 'Ads', subTitle: this.title }
  list: any = []
  viewData: any = null
  showModal: boolean = false
  isDeleteModal: boolean = false
  ids: any = []
  columns = [

    { key: 'id', header: 'Report ID' },
    { key: 'user_id', header: 'User ID' },
    { key: 'report_type', header: 'Report Type' },
    { key: 'date_submitted', header: 'Date Submitted' },
    { key: 'comment', header: 'Comment' },
    { key: 'status', header: 'Status' },
    // { key: 'verify_status', header: 'Verify Status' }
  ];

  mapReports(data: any) {
    const reports = data.map((report: any) => ({
      id: report.id,
      user_id: report.user_id,
      report_type: report.title,
      comment: report?.subject,
      date_submitted: dateTimeFormat(report.created_at, "MM-DD-YYYY:hh:m A"),
      status: report.status ? "Active" : "In-active",
    }))
    this.list = reports
  }

  getReports = (url: string) => {
    this.loading = true;
    this.reportService.getReports(url).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.mapReports(data.data.data)
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  searchFillter(query: any) {
    if (query.search) {
      this.loading = true;
      this.reportService.searchReports("search-product-report", { search: query.search }).subscribe({
        next: (data: any) => {
          this.mapReports(data.data.data)
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  detailView(item: any) {
    this.viewData = { ...item, flag: 'report' }
  }

  hideModal() {
    this.isDeleteModal = false
    this.viewData = null
    this.ids = []
  }

  confirmDelete() {
    this.reportService.deleteReport(this.ids?.join()).subscribe({
      next: (res: any) => {
        this.getReports("reports")
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
  handleStatus(id: number) {
    this.reportService.updateReport({ report_id: id, status: 1 }).subscribe({
      next: (res: any) => {
        this.toastr.success(res?.message);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Repost Status updated not Successfully.");
      }
    });
  }
  ngOnInit(): void {
    this.getReports("reports")
  }
}
