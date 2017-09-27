import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CarouselComponent implements OnInit {

  height:String = '100px';

  onResize(event) {
    this.resize(event.target.innerWidth, event.target.innerHeight)
  }

  resize(width, height) {
    let windowHeight = height;
    let windowWidth = width;
    let ratio = 1.4980090257;

    let maxImageHeight = windowWidth / ratio;

    this.height = `${Math.min(windowHeight, maxImageHeight)}px`;
  }

  constructor() {
  }

  ngOnInit() {
    this.resize(window.innerWidth, window.innerHeight)
  }

  animate(elem, style, unit, from, to, time, prop) {
    if (!elem) {
      return;
    }

    let start = new Date().getTime();
    let timer = setInterval(function () {
      var step = Math.min(1, (new Date().getTime() - start) / time);
      if (prop) {
        elem[style] = (from + step * (to - from)) + unit;
      } else {
        elem.style[style] = (from + step * (to - from)) + unit;
      }
      if (step === 1) {
        clearInterval(timer);
      }
    }, 25);

    if (prop) {
      elem[style] = from + unit;
    } else {
      elem.style[style] = from + unit;
    }
  }

  /**
   *
   * @param id
   */
  navigateTo(id) {
    var target = document.getElementById(id);
    var elm = document.scrollingElement || document.documentElement;
    this.animate(elm, "scrollTop", "", elm.scrollTop, target.offsetTop, 1000, true);
  };

}
