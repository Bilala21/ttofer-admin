import { AdService } from "@/services/ad.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
})
export class AdsComponent implements OnInit {
  constructor(private adService: AdService, private toastr: ToastrService) { }
  title = "All Ads"
  loading: boolean = true
  data = { title: `${this.title} Table` }
  breadCrumbData = { title: 'Ads', subTitle: this.title }
  list: any = []
  viewData: any = null
  showModal: boolean = false
  isDeleteModal: boolean = false
  ids: any = []

  columns = [
    { key: 'checkbox', header: 'Check box' },
    { key: 'id', header: 'Ad ID' },
    { key: 'title', header: 'Title' },
    { key: 'user_id', header: 'User id' },
    { key: 'category', header: 'Category' },
    { key: 'posting_date', header: 'Posting date' },
    { key: 'status', header: 'Status' },
    { key: 'verify_status', header: 'User status' }
  ];


  getAds = (url: string) => {
    this.loading = true;
    this.adService.getAds(url).subscribe({
      next: (data: any) => {
        this.loading = false;
        const ads = data.data?.data?.map((ad: any) => ({
          id: ad.id,
          title: ad.title,
          user_id: ad.user_id,
          category: ad.category?.name ? ad.category?.name : "N/A",
          posting_date: dateTimeFormat(ad.created_at, "MM-DD-YYYY:hh:m A"),
          status: ad.status ? "Active" : "In-active",
          verify_status: ad?.user?.status ? "Verified" : "Un-Verified"
        }))
        this.list = ads
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  searchFillter(query: any) {
    if (query.search) {
      this.getAds(`ads-search?search=${query.search}`)
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
    this.adService.deleteAd(this.ids?.join()).subscribe({
      next: (res: any) => {
        this.getAds("ads")
        this.toastr.success(res?.message);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Ad Not Deleted successfully.");
      }
    });
    this.isDeleteModal = false
  }

  deleteElement(ids: any) {
    this.isDeleteModal = true
    this.ids = ids
  }


  ngOnInit(): void {
    this.getAds("ads")
  }
}
