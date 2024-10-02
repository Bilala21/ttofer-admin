import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "delete-modal-compnent",
  templateUrl: "./index.component.html",
})
export class DeleteModalComponent {
  constructor() { }
  @Input() isDeleteModal: boolean = false;
  @Output() confirmDelete = new EventEmitter<number>();
  @Output() closeDeleteModal = new EventEmitter<number>();

  hideModal() {
    this.closeDeleteModal.emit();
  }
  deleteRecord() {
    this.confirmDelete.emit()
  }
}
