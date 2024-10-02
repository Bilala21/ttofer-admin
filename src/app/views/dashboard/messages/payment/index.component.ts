import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "payment",
  templateUrl: "./index.component.html",
})
export class PaymentComponent {
  paymentForm: FormGroup;
  is_submited = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.paymentForm = this.fb.group({
      amount: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
        Validators.pattern(/^\d+$/),
      ]],
      checked: [false, [Validators.requiredTrue]],
      currency: ['usd', [Validators.required]],
      token: ['tok_visa', [Validators.required]],
    });
  }
  onSubmit(): void {
    this.paymentForm.markAllAsTouched();

    if (this.paymentForm.valid) {
      this.is_submited = true;
      this.http.post("/charge", this.paymentForm.value).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.toastr.success("Your payment was processed successfully");
            this.is_submited = false;
          }
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error("Payment Not Successful");
          this.is_submited = false;
        }
      });
    } else {
      console.warn('Form is invalid', this.paymentForm);
    }
  }

  // Helper to access form controls in the template
  // get f() {
  //   return this.paymentForm.controls;
  // }
}
