import {Component, OnInit,} from '@angular/core';
import {ImgPreviewService} from "./img-preview.service";

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  providers: []
})
export class ImgPreviewComponent implements OnInit {

  constructor(private _imgPreviewService: ImgPreviewService) {

  }

  img = null;

  ngOnInit() {
    this._imgPreviewService.image.subscribe((img) => {

      if (img !== null) {
        console.log(img)
        let videoHeight = img.height;
        let winHeight = window.innerHeight;

        if (winHeight < (videoHeight + 80)){
          let ratio = img.height / img.width;
          let newHeight = winHeight - 80;
          let newWidth = newHeight/ratio;

          console.log(img.width, newWidth)
          img.height = newHeight;
          img.width = newWidth;
        }


      }

      this.img = img;
    });
  }

  close() {
    this._imgPreviewService.close();
  }


}
