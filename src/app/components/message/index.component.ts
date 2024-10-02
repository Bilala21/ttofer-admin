import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "message",
  templateUrl: "./index.component.html",
})
export class MessageComponent {
  @Input() conversation: any
  constructor() { }

  dateTimeFormat(date: string, format: string) {
    return dateTimeFormat(date, format);
  }
}
