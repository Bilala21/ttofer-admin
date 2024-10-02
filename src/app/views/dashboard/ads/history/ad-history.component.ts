import { AdService } from "@/services/ad.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-history",
  templateUrl: "./ad-history.component.html",
})
export class AdsHistoryComponent implements OnInit {
  constructor(private adService: AdService) { }
  title = "Approve or Reject Ads"
  loading: boolean = true
  data = { title: `${this.title} Table` }
  breadCrumbData = { title: 'Ads', subTitle: this.title }
  viewData: any = null
  showModal: boolean = false
  list: any = []
  columns = [
    { key: 'id', header: 'Ad ID' },
    { key: 'user_id', header: 'User id' },
    { key: 'title', header: 'Ad Title' },
    { key: 'posting_date', header: 'Date Submited' },
    { key: 'ending_date', header: 'Expiry Date' },
    { key: 'status', header: 'Status' },
    { key: 'viewd_by', header: 'Views' }
  ];

  tableData: any = {}
  getAds = (url: string) => {
    this.loading = true;
    this.adService.getAds(url).subscribe({
      next: (data: any) => {
        this.loading = false;
        const ads = data.data.data.map((ad: any) => {
          return {
            id: ad.id,
            title: ad.title,
            user_id: ad.user_id,
            posting_date: dateTimeFormat(ad.created_at, "MM-DD-YYYY:hh:m A"),
            ending_date: ad?.ProductType.trim().toLowerCase() === "featured" ? "Featured" : ad?.ending_date ? dateTimeFormat(ad.ending_date, "MM-DD-YYYY:hh:m A") : "N/A",
            status: ad.status ? "Active" : "In-active",
            viewd_by: ad.total_review +" People",
          }
        })
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
    this.viewData = null
  }


  ngOnInit(): void {
    this.getAds("ads")
  }
}

