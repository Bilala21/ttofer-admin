import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "modal-compnent",
  templateUrl: "./index.component.html",
  styleUrls: ['modal.component.css']

})
export class ModalComponent implements OnInit {
  constructor() { }
  @Input() item: any = null;
  keys: any = null
  @Input() isBanner: boolean = false;
  @Input() previewTitle: string = "";
  page_name?:string=""
  @Output() closeModal = new EventEmitter<number>();
  @Output() handleStatus = new EventEmitter<number>();

  hideModal() {
    this.closeModal.emit();
  }
  changeStatus(id: number) {
    this.handleStatus.emit(id);
  }

  ngOnInit() {
    this.keys = Object.keys(this.item).length ? Object.keys(this.item) : null;
  }
}
