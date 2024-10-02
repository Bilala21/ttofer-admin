import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-not-found",
  templateUrl: "./index.component.html",
})
export class NotfoundComponent implements OnInit {
  collapseShow = "hidden";
  constructor() { }

  ngOnInit() { }
  // toggleCollapseShow(classes) {
  //   this.collapseShow = classes;
  // }
}
