import {Directive, ElementRef, HostListener} from '@angular/core';
import {CONFIG} from "../consts/config";

@Directive({
  selector: "img[appHideMissingImage]",
})
export class HideMissingImageDirective {
  constructor(private el: ElementRef) {}

  @HostListener("error")
  private onError() {
    this.el.nativeElement.src = CONFIG.FALLBACK_IMAGE_URL;
    // this.el.nativeElement.style.display = "none";
  }
}
