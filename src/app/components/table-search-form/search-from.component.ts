import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-search-form',
  templateUrl: './search-from.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class TableSearchFromComponent implements OnInit {
  @Input() searchPlaceholder: string = "";
  @Output() searchChange = new EventEmitter<string>();

  searchForm: FormGroup;
  is_submited = false;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  onSubmit() {
    this.searchChange.emit(this.searchForm.value);
  }

  ngOnInit(): void {}
}
