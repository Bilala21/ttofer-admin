import { TeamMemberService } from "@/services/team.service";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-ttoffer-gift",
  templateUrl: "./create-ttoffer-gift.html",
})
export class CreateTtofferGiftComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.router = inject(Router);

    // Initialize the form with default values
    this.giftForm = this.fb.group({
      name: ['', [Validators.required]],
      giftValue: ['', [Validators.required, Validators.email]],
      giftType: ['', [Validators.required]],
      giftCode: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }
  title = "Add Ttoffer gifts"
  loading: boolean = true
  breadCrumbData = { subTitle: this.title }
  list: any = []
  giftForm: FormGroup;
  router: any = null;



  is_submited = false;

  onSubmit(): void {
    this.giftForm.markAllAsTouched();
    console.log(this.giftForm.value);
    if (this.giftForm.valid) {
      // this.is_submited = true;

      // this.http.post("/add/team/member", this.giftForm.value).subscribe({
      //   next: (response: any) => {
      //     if (response.status === "success") {
      //       this.toastr.success("Account registered successfully.");
      //     }
      //     this.giftForm.reset();
      //   },
      //   error: (error: any) => {
      //     this.toastr.error("The email has already been taken.");
      //     this.is_submited = false;
      //   }
      // });
    } else {
      console.warn("Form is invalid", this.giftForm);
    }
  }


  ngOnInit(): void {
  }
}


