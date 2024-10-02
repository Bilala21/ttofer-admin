import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  authForm: FormGroup;
  router: any = null
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.router = inject(Router)
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        ]
      ],
      user_type: ['',Validators.required],
      rememberme: [''],
    });
  }
  is_submited = false


  onSubmit(): void {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.is_submited = true
      this.http.post("https://ttoffer.com/backend/public/api/login-email", this.authForm.value).subscribe({
        next: (response: any) => {
          if (response.status == "success") { } {
            this.toastr.success("Your loggedin successfully");
            localStorage.setItem("authToken", response.data.token)
            this.router.navigate(["dashboard"])
          }
          this.authForm.reset();
        },
        error: (error: any) => {
          console.log(error);
          this.is_submited = false
          this.toastr.error("Invalid credentials")
        }
      });
    } else {
      console.warn('Form is invalid', this.authForm);
    }
  }
}
