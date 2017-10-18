import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[tooltip]'
})

export class TooltipDirective {

  constructor(private elementRef: ElementRef) {
  }

  tooltip: any;
  elemPosition: any;
  tooltipOffset: number = 8;
  hideTimeoutId: any;
  showTimeoutId: any;
  disabled: boolean = false;

  @Input('tooltip') tooltipText = null;
  @Input() placement = "top";
  @Input() delay = 0;
  @Input('show-delay') showDelay = 0;
  @Input('hide-delay') hideDelay = 500;
  @Input('z-index') zIndex = false;

  @HostListener("focusin")
  @HostListener("mouseenter")
  onMouseEnter() {

    this.getElemPosition();

    if (!this.tooltip) {
      this.create();

      if (this.disabled == false) {
        this.setPosition();
        this.show();
      }
    }

  }

  @HostListener("focusout")
  @HostListener("mouseleave")
  onMouseLeave() {
    if (!this.disabled) {
      this.hide();
    }
  }

  getElemPosition() {
    this.elemPosition = this.elementRef.nativeElement.getBoundingClientRect();
  }

  create() {

    if (typeof this.tooltipText !== 'undefined') {
      this.showDelay = this.delay || this.showDelay;
      this.tooltip = document.createElement('span');
      this.tooltip.className += "ng-tooltip ng-tooltip-" + this.placement;

      this.tooltip.textContent = this.tooltipText;
      if (this.zIndex) this.tooltip.style.zIndex = this.zIndex;

      // when
      let fromDate = new Date(this.tooltipText.date);
      let whenString = `${fromDate.getDate()}/${fromDate.getMonth() + 1}/${fromDate.getFullYear()}`;

      if (typeof this.tooltipText.dateTo !== 'undefined' && this.tooltipText.dateTo !== '') {
        let toDate = new Date(this.tooltipText.dateTo);
        whenString += ` - ${toDate.getDate()}/${toDate.getMonth() + 1}/${toDate.getFullYear()}`;
      }

      this.tooltip.innerHTML = `
        <ul>
          <li>Event: ${ this.tooltipText.title}</li>
          <li>Place: ${ this.tooltipText.place}</li>
          <li>When: ${whenString}</li>
        </ul>
      `;
      document.body.appendChild(this.tooltip);
    } else {
      this.disabled = true;
    }
  }

  show() {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }

    this.showDelay = this.delay || this.showDelay;
    this.showTimeoutId = setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.className += " ng-tooltip-show";
      }
    }, this.showDelay);
  }

  hide() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }

    if (this.tooltip) {
      this.tooltip.classList.remove("ng-tooltip-show");
      this.hideTimeoutId = setTimeout(() => {
        this.tooltip.parentNode.removeChild(this.tooltip);
        this.tooltip = null;
      }, this.hideDelay);
    }
  }

  setPosition() {
    let elemHeight = this.elementRef.nativeElement.offsetHeight;
    let elemWidth = this.elementRef.nativeElement.offsetWidth;
    let tooltipHeight = this.tooltip.clientHeight;
    let tooltipWidth = this.tooltip.offsetWidth;
    let scrollY = window.pageYOffset;

    if (this.placement == 'top') {
      this.tooltip.style.top = (this.elemPosition.top + scrollY) - (tooltipHeight + this.tooltipOffset) + 'px';
    }

    if (this.placement == 'bottom') {
      this.tooltip.style.top = (this.elemPosition.top + scrollY) + elemHeight + this.tooltipOffset + 'px';
    }

    if (this.placement == 'top' || this.placement == 'bottom') {
      this.tooltip.style.left = (this.elemPosition.left + elemWidth / 2) - tooltipWidth / 2 + 'px';
    }

    if (this.placement == 'left') {
      this.tooltip.style.left = this.elemPosition.left - tooltipWidth - this.tooltipOffset + 'px';
    }

    if (this.placement == 'right') {
      this.tooltip.style.left = this.elemPosition.left + elemWidth + this.tooltipOffset + 'px';
    }

    if (this.placement == 'left' || this.placement == 'right') {
      this.tooltip.style.top = (this.elemPosition.top + scrollY) + elemHeight / 2 - this.tooltip.clientHeight / 2 + 'px';
    }
  }
}
