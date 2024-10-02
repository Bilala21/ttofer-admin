import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  constructor() { }
  @Input() size: number = 0
  radius = ""


  ngOnInit(): void {
    this.radius = this.size ? `h-${this.size} w-${this.size}` : "w-4 h-4"
  }
}
