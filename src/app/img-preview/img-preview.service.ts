import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ImgPreviewService {

  image: BehaviorSubject<any>;

  constructor() {
    this.image = new BehaviorSubject(null);
  }


  load(img, type) {
    this.image.next({
      url: img.images.standard_resolution.url,
      width: img.images.standard_resolution.width,
      height: img.images.standard_resolution.height,
      type: type,
      video: type == 'video'?img.videos.standard_resolution.url:''
    });
  }

  close(){
    this.image.next(null);
  }

}
