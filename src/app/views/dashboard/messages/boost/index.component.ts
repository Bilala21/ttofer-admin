import { BoostingService } from "@/services/boosting.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "boost",
  templateUrl: "./index.component.html",
})
export class BoostComponent implements OnInit {
  constructor(private boostingService: BoostingService, private toastr: ToastrService) { }

  title = "Boost"
  selectedIds = []
  loading: boolean = true
  tableData: any = {}
  data = { page: this.title, title: `Existing Boosts List` }
  breadCrumbData = { subTitle: this.title }
  list: any = []
  viewData: any = null
  showModal: boolean = false
  isDeleteModal: boolean = false
  ids: any = []

  columns = [
    { key: 'id', header: 'Boost ID' },
    { key: 'produc_type', header: 'Type' },
    { key: 'ad_id', header: 'Ad ID' },
    { key: 'start_date', header: 'Start Date' },
    { key: 'end_date', header: 'End Date' },
    { key: 'status', header: 'Status' },
  ];



  getBoosting = (url: string) => {
    this.loading = true;
    this.boostingService.getBoosting(url).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        const boostings = data.data.data.map((boosting: any) => ({
          id: boosting.id,
          produc_type: boosting.ProductType,
          ad_id: boosting?.ad_id,
          start_date: dateTimeFormat(boosting?.booster_start_datetime, "MM-DD-YYYY:hh:m A"),
          end_date: dateTimeFormat(boosting?.booster_end_datetime, "MM-DD-YYYY:hh:m A"),
          status: boosting.status ? "Active" : "In-active",
        }))
        this.list = boostings
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
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
    this.boostingService.deleteBoosting(this.ids?.join()).subscribe({
      next: (res: any) => {
        this.getBoosting("get-boosting-products")
        this.toastr.success(res?.message);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Boosting Not Deleted successfully.");
      }
    });
    this.isDeleteModal = false
  }

  deleteElement(ids: any) {
    this.isDeleteModal = true
    this.ids = ids
  }


  ngOnInit(): void {
    this.getBoosting("get-boosting-products")
  }
}




