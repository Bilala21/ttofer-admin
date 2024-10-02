import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-from',
  templateUrl: './search-from.component.html'
})
export class SearchFromComponent implements OnInit {
 @Input() searchPlaceholder:string="";
  @Output() searchChange = new EventEmitter<string>();

  searchForm: FormGroup;
  is_submited = false
  constructor(private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  onSubmit() {
    this.searchChange.emit(this.searchForm.value);
  }
  ngOnInit(): void {
  }
}
