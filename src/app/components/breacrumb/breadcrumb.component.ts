import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  constructor() {}
  @Input() breadCrumbData: any;
  ngOnInit(): void {}
}
