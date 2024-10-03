import { BannerService } from "@/services/banner.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: "banner",
  templateUrl: "./banner.component.html",
})
export class BannerComponent implements OnInit {
  bannerForm: FormGroup;
  router: any = null;
  isSubmitted = false;
  activeTab = "product";
  deleteImg = false;
  title = "Banners";
  loading = true;
  list: any = [];
  editData: any = null;
  showModal = false;
  isDeleteModal = false;
  ids: any = [];
  file: any = null;
  viewData: any = null;
  today: any;
  imageSrc: string | ArrayBuffer | null = null;
  imageUrls: any=[];
  files:any=[]


  data = { title: `Existing ${this.title} List` };
  breadCrumbData = { title: '', subTitle: this.title };
  columns = [
    { key: 'id', header: 'Banner ID' },
    { key: 'img', header: 'Image Preview' },
    { key: 'page_name', header: 'Placement' },
    { key: 'start_datetime', header: 'Start date' },
    { key: 'end_datetime', header: 'End date' },
    { key: 'sequence', header: 'Banner' },
    { key: 'status', header: 'Status' }
  ];

  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.router = inject(Router);
    this.bannerForm = this.fb.group({
      // image: [null],
      images: [null],
      sequence: ['', Validators.required],
      page_name: [this.activeTab, Validators.required],
      end_datetime: ['', Validators.required],
      start_datetime: ['', Validators.required],
    }, { validators: this.dateComparisonValidator() });
  }

  // Custom validator to compare start_datetime and end_datetime
  private dateComparisonValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDatetime = control.get('start_datetime')?.value;
      const endDatetime = control.get('end_datetime')?.value;

      return startDatetime && endDatetime && new Date(startDatetime) >= new Date(endDatetime)
        ? { 'dateInvalid': true }
        : null;
    };
  }

  ngOnInit(): void {
    this.getBanners("get-banners");
    this.today = new Date().toISOString().split("T")[0];
    // this.getBanners("get-banners");
  }

  onSubmit(): void {
    this.bannerForm.markAllAsTouched();
    if (this.bannerForm.valid && this.imageUrls.length) {
      this.submitForm();
    } else {
      this.setImageError();
    }
  }

  private submitForm(): void {
    const formData = this.createFormData();

    this.isSubmitted = true;
    const apiUrl = this.editData?.id ? "update-banner" : "add-banner";

    this.bannerService.createBanners(apiUrl, formData).subscribe({
      next: (response) => {
        if (response.status === "success") {
          this.toastr.success(response.message);
          this.bannerForm.reset();
          this.isSubmitted = false;
          this.imageSrc = null;
          this.getBanners("get-banners");
        }
      },
      error: () => {
        this.toastr.error("Banner not saved successfully");
      }
    });
  }

  private createFormData(): any {
    const formData = new FormData();
    if (this?.files.length) {
      formData.append("image", this.files);
    }
    formData.append("banner_id", this.editData?.id);
    formData.append("sequence", this.bannerForm.get('sequence')?.value);
    formData.append("page_name", this.bannerForm.get('page_name')?.value);
    formData.append("start_datetime", this.bannerForm.get('start_datetime')?.value);
    formData.append("end_datetime", this.bannerForm.get('end_datetime')?.value);
    return formData;
  }

  private setImageError(): void {
    if (!this.files.length && !this.imageSrc) {
      this.bannerForm.get('images')?.setErrors({ required: true });
    }
  }

  handleTab(tag: string): void {
    this.activeTab = tag;
    this.bannerForm.patchValue({ page_name: tag });
  }



  handleFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    // console.log(input.files);
    const files = input.files;
    console.log(files);

    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls.push(reader.result)
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
        console.log(file,"billa");
        this.files.push(file);
        this.bannerForm.get('images')?.updateValueAndValidity();
      })

      console.log(this.imageUrls,"imageUrls");









      // for (const file of Array.from(files)) {
      //   console.log(file);
      //   if (file && file.type.startsWith('image/')) {
      //     const isDuplicate = this.bannerForm.value.images.some((img: File) => img.name === file.name);
      //     if (!isDuplicate) {
      //       this.bannerForm.value.images.push(file);
      //     } else {
      //       this.toastr.error(`Duplicate image: ${file.name}`);
      //     }
      //   } else {
      //     this.toastr.error(`Invalid file type: ${file.name}`);
      //   }
      // }
    }

    // this.resetFileInput(input);
    // this.deleteImg = false;
  }


  // handleFile(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];

  //   if (file && file.type.startsWith('image/')) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageSrc = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.file = file;
  //     this.bannerForm.get('image')?.updateValueAndValidity();
  //   }

  //   this.resetFileInput(input);
  //   this.deleteImg = false;
  // }

  resetFileInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
  }

  handleDeleteImg(): void {
    this.deleteImg = true;
    this.imageSrc = null;
    this.imageUrls = [];
    this.files = [];
  }

  getBanners(url: string): void {
    this.loading = true;
    this.bannerService.getBanners(url).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.list = data.data.map((banner: any) => ({
          id: banner.id,
          img: banner.img,
          page_name: banner.page_name,
          start_datetime: dateTimeFormat(banner.start_datetime, "YYYY-MM-DD"),
          end_datetime: dateTimeFormat(banner.end_datetime, "YYYY-MM-DD"),
          status: banner.status ? "Active" : "Inactive",
          sequence: banner.sequence
        }));
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  detailView(item: any): void {
    if (item && !item?.banner) {
      this.editData = item;
      this.activeTab = item.page_name;
      this.imageSrc = item.img;
      this.bannerForm.patchValue({
        sequence: item.sequence || '',
        page_name: item.page_name || '',
        start_datetime: item.start_datetime,
        end_datetime: item.end_datetime
      });
    } else {
      this.viewData = { ...item, isImage: true };
    }
  }

  hideModal(): void {
    this.isDeleteModal = false;
    this.ids = [];
    this.viewData = null;
  }

  confirmDelete(): void {
    this.bannerService.deleteBanner(this.ids.join()).subscribe({
      next: (res: any) => {
        this.getBanners("get-banners");
        this.toastr.success(res.message);
      },
      error: () => {
        this.toastr.error("Banner not deleted successfully.");
      }
    });
    this.isDeleteModal = false;
  }

  deleteElement(ids: any): void {
    this.isDeleteModal = true;
    this.ids = ids;
  }
}
