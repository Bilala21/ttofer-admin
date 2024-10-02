import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-new-member',
  templateUrl: './add-new-member.component.html'
})
export class AddNewMemberComponent implements OnChanges {
  @Input() member: any = null; // Edit data input
  memberForm: FormGroup;
  router: any = null;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.router = inject(Router);

    // Initialize the form with default values
    this.memberForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      user_type: ['', [Validators.required]],
      phone: ['03444404698'],
    });
  }
  
  is_submited = false;

  onSubmit(): void {
    this.memberForm.markAllAsTouched();
    if (this.memberForm.valid) {
      this.is_submited = true;

      this.http.post("/add/team/member", this.memberForm.value).subscribe({
        next: (response: any) => {
          if (response.status === "success") {
            this.toastr.success("Account registered successfully.");
          }
          this.memberForm.reset();
        },
        error: (error: any) => {
          this.toastr.error("The email has already been taken.");
          this.is_submited = false;
        }
      });
    } else {
      console.warn("Form is invalid", this.memberForm);
    }
  }

  // Lifecycle hook to detect changes in the @Input() member
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && this.member) {
      this.patchFormValues(this.member);
    }
  }

  // Method to update form values with member data
  patchFormValues(member: any): void {
    this.memberForm.patchValue({
      name: member?.name || '',
      email: member?.email || '',
      user_type: member?.role || '',
      phone: member?.phone || '03444404698' // Default phone
    });
  }
}
