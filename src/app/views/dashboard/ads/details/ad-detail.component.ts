import { AdService } from "@/services/ad.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "index",
  templateUrl: "./ad-detail.component.html",
})
export class AdDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private adService: AdService, private toastr: ToastrService) { }
  breadCrumbData = { title: 'Ad details' }
  item: any = null
  apId: number = 0
  loading: boolean = true
  is_submited: boolean = false


  adStatus(status: number, id: number) {
    this.adService.updateStatus(status, id, "update-product-status").subscribe({
      next: (res: any) => {
        this.toastr.success(res?.msg);
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error("Ad Status updated not Successfully.");
      }
    });
  }
  rejectAd(id: number) {
    this.adStatus(0, id)
  }
  async approvedAd(id: number) {
    this.adStatus(1, id)
  }
  async addComment(comment: string, product: any) {
    try {
      this.is_submited = true
      const data = { user_id: product?.user_id, product_id: product?.id, title: product?.title, description: comment }
      const res = await firstValueFrom(this.adService.updateProduct(data, "/edit-product-first-step"));
      if (res?.status === 'success') {
        this.toastr.success(res?.msg);
      }
      else {
        this.toastr.error("Product Not Updated successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      this.toastr.error("Product Not Updated successfully.");
    } finally {
      this.is_submited = false
    }
  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const product_id: any = params.get('product_id');
      this.loading = true;
      this.adService.getAdById("product-detail", product_id).subscribe({
        next: (data: any) => {
          console.log(data?.data?.user?.status);
          this.loading = false;
          this.apId = data?.data?.user?.status ? 1 : 0,
            this.item = {
              id: data?.data?.id,
              title: data?.data?.title,
              user_id: data?.data?.user_id,
              description: data?.data?.description,
              img: data?.data?.photo,
              video: data?.data?.video,
              category: data?.data?.category?.name ? data?.data?.category?.name : "N/A",
              posting_date: dateTimeFormat(data?.data?.created_at, "MM-DD-YYYY:hh:m A"),
              status: +(data?.data?.status) ? 1 : 0,
              verify_status: +(data?.data?.user?.status) ? 1 : 0,

            }
        },
        error: (error: any) => {
          console.error('Error:', error);
          this.loading = false;
        }
      });
    });
  }
}
