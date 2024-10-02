import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
})
export class HeaderDropdownComponent {
  constructor() { }
  @Output() handleLinkClick = new EventEmitter<any>();
  @Output() loadMoreFun = new EventEmitter<any>();
  @Input({ required: true }) data: any = []
  @Input({ required: true }) loadMore: boolean = false
  current_page: number = 1
  @Input({ required: true }) fieldName: string = ""

  field(item: any) {
    return item[this.fieldName]
  }
  handleClick() {
    this.handleLinkClick.emit();
  }
  handleLoadMore(current_page: number) {
    this.loadMoreFun.emit(current_page);
  }
}
