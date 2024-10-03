import { TeamMemberService } from "@/services/team.service";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-ttoffer-gift",
  templateUrl: "./create-ttoffer-gift.html",
})
export class CreateTtofferGiftComponent implements OnInit {
  constructor(private fb: FormBuilder, private toastr: ToastrService, private route: ActivatedRoute) {
    this.router = inject(Router);

    // Initialize the form with default values
    this.giftForm = this.fb.group({
      // name: ['', [Validators.required]],
      giftValue: ['', [Validators.required]],
      // giftType: ['', [Validators.required]],
      // giftCode: ['', [Validators.required]],
      // startDate: ['', [Validators.required]],
      // endDate: ['', [Validators.required]],
    });
  }
  item: any = null
  loading: boolean = true
  list: any = []
  giftForm: FormGroup;
  router: any = null;
  isSubmitted = false;


  onSubmit(): void {
    this.giftForm.markAllAsTouched();
    console.log(this.giftForm.value);
    if (this.giftForm.valid) {
      // this.isSubmitted = true;

      // this.http.post("/add/team/member", this.giftForm.value).subscribe({
      //   next: (response: any) => {
      //     if (response.status === "success") {
      //       this.toastr.success("Account registered successfully.");
      //     }
      //     this.giftForm.reset();
      //   },
      //   error: (error: any) => {
      //     this.toastr.error("The email has already been taken.");
      //     this.isSubmitted = false;
      //   }
      // });
    } else {
      console.warn("Form is invalid", this.giftForm);
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id: any = params.get('id');
      this.item = id
      console.log(new Date());
      this.loading = true;
      if (id) {
        this.giftForm.patchValue({
          // name: "Bilal",
          giftValue: "4545",
          // giftType:"discount coupon",
          // giftCode: "323",
          // startDate: "Wed Oct 02 2024 20:53:42 GMT+0500 (Pakistan Standard Time)",
          // endDate: "",
        })
      }
      // this.adService.getAdById("product-detail", product_id).subscribe({
      //   next: (data: any) => {
      //     this.loading = false;
      //     this.apId = data?.data?.user?.status ? 1 : 0,
      //       this.item = {
      //         id: data?.data?.id,
      //         title: data?.data?.title,
      //         user_id: data?.data?.user_id,
      //         description: data?.data?.description,
      //         img: data?.data?.photo,
      //         video: data?.data?.video,
      //         category: data?.data?.category?.name ? data?.data?.category?.name : "N/A",
      //         posting_date: dateTimeFormat(data?.data?.created_at, "MM-DD-YYYY:hh:m A"),
      //         status: +(data?.data?.status) ? 1 : 0,
      //         verify_status: +(data?.data?.user?.status) ? 1 : 0,

      //       }
      //   },
      //   error: (error: any) => {
      //     console.error('Error:', error);
      //     this.loading = false;
      //   }
      // });
    });
  }
}


