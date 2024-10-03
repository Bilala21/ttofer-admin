import { BannerService } from "@/services/banner.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AdService } from "@/services/ad.service";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product-component.html",
})
export class CreateProductComponent implements OnInit {
  postForm: FormGroup;
  router: any = null;
  isSubmitted = false;
  deleteImg = false;
  loading = true;
  editData: any = null;
  file: any = null; // Single image file
  videoFile: any = null; // Single image file
  today: any;
  imageSrc: any = null; // URL for image preview
  videoSrc: any = null; // URL for image preview
  title = "Add Product";
  breadCrumbData = { subTitle: this.title };
  item:any=null

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    adService: AdService
  ) {
    this.router = inject(Router);
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sub_category: ['', [Validators.required]],
      pricing_category: ['', [Validators.required]],
      make: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      year: ['', [Validators.required]],
      fuel_type: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      location: ['', [Validators.required]],
      image: [null, [Validators.required]],
      video: [null],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.today = new Date().toISOString().split("T")[0];
  }

  onSubmit(): void {
    console.log(this.postForm.value);
    this.postForm.markAllAsTouched();
    if (this.postForm.valid && this.file) {
      console.log("Form submitted:", this.postForm.value);
      this.isSubmitted = true;
      // this.submitForm();
    } else {
      this.setImageError();
    }
  }

  private submitForm(): void {
    const formData = this.createFormData();
  }

  private createFormData(): any {
    const formData = new FormData();
    if (this.file) {
      formData.append("image", this.file);
    }
    formData.append("banner_id", this.editData?.id);
    formData.append("sequence", this.postForm.get('sequence')?.value);
    formData.append("page_name", this.postForm.get('page_name')?.value);
    formData.append("start_datetime", this.postForm.get('start_datetime')?.value);
    formData.append("end_datetime", this.postForm.get('end_datetime')?.value);
    return formData;
  }

  private setImageError(): void {
    if (!this.file) {
      this.postForm.get('image')?.setErrors({ required: true });
    }
  }

  handleFile(event: Event, flag: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (flag === "video") {
          console.log(reader.result);
          this.videoSrc = reader.result as string;
        }
        else {
          this.imageSrc = reader.result as string;
        }
      };

      reader.readAsDataURL(file);
      if (flag === "video") {
        this.videoFile = file;
      }
      else {
        this.file = file;
        this.postForm.get('image')?.updateValueAndValidity();
      }

    }
  }

  resetFileInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.imageSrc = null;
    this.videoSrc = null;
    this.file = null;
    this.videoFile = null;
    this.postForm.get('image')?.updateValueAndValidity();
  }

  handleDeleteImg(): void {
    this.deleteImg = true;
    this.imageSrc = null;
    this.videoSrc = null;
    this.file = null;
    this.videoFile = null;
    this.postForm.get('image')?.setValue(null);
    this.postForm.get('video')?.setValue(null);
    this.postForm.get('image')?.updateValueAndValidity();
  }
}
