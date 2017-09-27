import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class GalleryComponent implements OnInit {

  constructor() {

  }


  height:String = '200px';

  onResize(event) {
    this.resize(event.target.innerWidth)
  }

  // 322 / 241.5
  resize(width) {
    let windowWidth = width;
    let ratio = 1.333;

    this.height = `${windowWidth / ratio }px`;
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.resize(window.innerWidth);
    }
  }

}
