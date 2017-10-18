import {Component, OnInit,} from '@angular/core';
import {InstagramService} from "./instagram.service";
import {ImgPreviewService} from "../img-preview/img-preview.service";
import {Jsonp} from '@angular/http';

import Device from './../device/device';

/**
 * returns if used device is mobile
 * @const isMobile
 * @type {boolean}
 * @private
 * @protected
 */
const isMobile = Device._isMobile();

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [InstagramService]
})
export class GalleryComponent implements OnInit {

  isMobile;

  constructor(private _imagePreviewService: ImgPreviewService,
              private _instagramService: InstagramService,
              private _jsonp: Jsonp) {
    this.isMobile = isMobile;
  }

  render = []

  // height:String = '200px';
  //
  onResize(event) {

  }

  //
  // // 322 / 241.5
  // resize(width) {
  //   let windowWidth = width;
  //   let ratio = 1.333;
  //
  //   this.height = `${windowWidth / ratio }px`;
  // }

  images = [];


  preview(img, type) {
    this._imagePreviewService.load(img, type);
  }

  ngOnInit() {
    // if (typeof window !== 'undefined') {
    //   this.resize(window.innerWidth);
    // }

    this._instagramService.load();
    this._instagramService.images.subscribe(list => {
      this.images = list;
    });
  }

  //
  // displayImages(images) {
  //
  //   let ws = [];
  //   let rowNum = 0;
  //   let baseLine = 0;
  //   let limit = images.length;
  //   let photos = images;
  //   let rows = [];
  //   let totalWidth = 0;
  //   let appendBlocks = [];
  //   let rowHeight = 150;
  //   let maxRow = 200;
  //   let maxRowHeight = 350;
  //
  //   let w = 800;
  //
  //   let border = 1;
  //
  //   //var d = this.$el,
  //
  //   let h = rowHeight;
  //
  //   if (this.images.length === 0) {
  //     return;
  //   }
  //
  //   images.forEach((image, index) => {
  //     let wt = image.images.low_resolution.width;
  //     let ht = image.images.low_resolution.height;
  //
  //     if (ht !== h) {
  //       wt = Math.floor(wt * (h / ht));
  //     }
  //
  //     totalWidth += wt;
  //     ws.push(wt);
  //   });
  //
  //   appendBlocks.forEach((index, block) => {
  //     //totalWidth += block.width;
  //   });
  //
  //
  //   let perRowWidth = totalWidth / Math.ceil(totalWidth / w);
  //
  //   let tw = 0;
  //   while (baseLine < limit) {
  //     let row = {
  //       width: 0,
  //       photos: []
  //     };
  //     let c = 0;
  //     // let block = this.getBlockInRow(rows.length + 1);
  //     //
  //     // if(block){
  //     //   row.width += block.width;
  //     //   tw += block.width;
  //     // }
  //
  //     while ((tw + ws[baseLine + c] / 2 <= perRowWidth * (rows.length + 1)) && (baseLine + c < limit)) {
  //       tw += ws[baseLine + c];
  //       row.width += ws[baseLine + c];
  //       row.photos.push({
  //         width: ws[baseLine + c],
  //         photo: photos[baseLine + c]
  //       });
  //       c++;
  //     }
  //     baseLine += c;
  //     rows.push(row);
  //   }
  //   console.log("ROWS: ", rows.length, rows);
  //
  //
  //   for (let i = 0; i < rows.length; i++) {
  //     let row = rows[i];
  //
  //     let lastRow = false;
  //
  //     rowNum = i + 1;
  //
  //     // if (maxRow && rowNum > maxRows) {
  //     //   break;
  //     // }
  //
  //     if (i === rows.length - 1) {
  //       lastRow = true;
  //     }
  //
  //     tw = -1 * border;
  //
  //     let newBlock = this.getBlockInRow(lastRow ? -1 : rowNum), availableRowWidth = w;
  //
  //     if (newBlock) {
  //       availableRowWidth -= newBlock.width;
  //       tw = 0;
  //     }
  //
  //     // Ratio of actual width of row to total width of images to be used.
  //     var r = availableRowWidth / row.width,
  //       c = row.photos.length;
  //
  //     // new height is not original height * ratio
  //     var ht = Math.min(Math.floor(h * r), maxRowHeight);
  //     r = ht / rowHeight;
  //
  //     // var domRow = $('<div/>', {
  //     //   'class': 'picrow'
  //     // });
  //     // domRow.height(ht + border);
  //     // d.append(domRow);
  //
  //
  //     let rowEl = {
  //       height: ht + border,
  //       images: []
  //     };
  //
  //     let rowWidth = 0;
  //     row.photos.forEach((img, index) => {
  //
  //       // Calculate new width based on ratio
  //       let wt = Math.floor(img.width * r);
  //       row.photos[index].width = wt;
  //
  //
  //       console.log('index', index, row.photos[index].width);
  //       tw += wt + border;
  //
  //       rowWidth = tw;
  //
  //     });
  //
  //     console.log('tw', tw + ((row.photos.length - 1) * border), 'w', w)
  //
  //     if (tw + ((row.photos.length - 1) * border ) > w) {
  //       let photoLength = row.photos.length;
  //       let diff = rowWidth - w;
  //       for (let k = 0; k < diff; k++) {
  //         row.photos[k].width -= 1;
  //         console.log('k',k, row.photos[k].width)
  //       }
  //     }
  //
  //
  //     console.log('rowWidth', rowWidth)
  //
  //     var imagesHtml = '';
  //     for (var j = 0; j < row.photos.length; j++) {
  //       var photo = row.photos[j].photo;
  //
  //       // Calculate new width based on ratio
  //       var wt = Math.floor(row.photos[j].width * r);
  //       tw += wt + border;
  //
  //       rowEl.images.push({
  //         url: photo.images.low_resolution.url,
  //         width: row.photos[j].width,
  //         height: ht,
  //         marginR: (j < row.photos.length - 1) ? border : 0
  //       });
  //
  //       // imagesHtml += this.renderPhoto(photo, {
  //       //   src: this.options.thumbnailPath(photo, wt, ht),
  //       //   width: wt,
  //       //   height: ht
  //       // }, newBlock ? false : j === row.photos.length - 1);
  //     }
  //
  //     if (rowEl.images.length > 0) {
  //       this.render.push(rowEl)
  //     }
  //
  //
  //     // if(imagesHtml === ''){
  //     //   domRow.remove();
  //     //   continue;
  //     // }
  //     //
  //     // domRow.html(imagesHtml);
  //
  //
  //     // if ((Math.abs(tw - availableRowWidth) < 0.05 * availableRowWidth)) {
  //     //   // if total width is slightly smaller than
  //     //   // actual div width then add 1 to each
  //     //   // photo width till they match
  //     //   var k = 0;
  //     //   while (tw < availableRowWidth) {
  //     //     var div1 = domRow.find('.' + this.options.imageContainer + ':nth-child(' + (k + 1) + ')'),
  //     //       img1 = div1.find('.' + this.options.imageSelector);
  //     //     img1.width(img1.width() + 1);
  //     //     k = (k + 1) % c;
  //     //     tw++;
  //     //   }
  //     //   // if total width is slightly bigger than
  //     //   // actual div width then subtract 1 from each
  //     //   // photo width till they match
  //     //   k = 0;
  //     //   while (tw > availableRowWidth) {
  //     //     var div2 = domRow.find('.' + this.options.imageContainer + ':nth-child(' + (k + 1) + ')'),
  //     //       img2 = div2.find('.' + this.options.imageSelector);
  //     //     img2.width(img2.width() - 1);
  //     //     k = (k + 1) % c;
  //     //     tw--;
  //     //   }
  //     // } else{
  //     //   if( availableRowWidth - tw > 0.05 * availableRowWidth ){
  //     //     var diff = availableRowWidth-tw,
  //     //       adjustedDiff = 0,
  //     //       images = domRow.find('.' + this.options.imageContainer),
  //     //       marginTop = 0;
  //     //     for(var l = 0 ; l < images.length ; l++ ){
  //     //       var currentDiff = diff / (images.length),
  //     //         imgDiv = images.eq(l),
  //     //         img = imgDiv.find('.' + this.options.imageSelector),
  //     //         imageWidth = img.width(),
  //     //         imageHeight = img.height();
  //     //       if( i === images.length - 1 ){
  //     //         currentDiff = diff - adjustedDiff;
  //     //       }
  //     //       img.width( imageWidth + currentDiff );
  //     //       img.height( ( imageHeight / imageWidth ) * (imageWidth + currentDiff) );
  //     //       marginTop = (imageHeight - img.height()) / 2;
  //     //       img.css('margin-top', marginTop);
  //     //       adjustedDiff += currentDiff;
  //     //     }
  //     //   }
  //     // }
  //     //
  //     // if(newBlock){
  //     //   $('<div />', {
  //     //     class : this.options.imageContainer + ' added-block',
  //     //     css : {
  //     //       width : newBlock.width,
  //     //       height: ht
  //     //     },
  //     //     html : newBlock.html
  //     //   }).appendTo(domRow);
  //     // }
  //   }
  //
  //   console.log(this.render);
  // }
  //
  // getBlockInRow(rowNum) {
  //   let appendBlocks = [];
  //   for (var i = 0; i < appendBlocks.length; i++) {
  //     let block = appendBlocks[i];
  //     if (block.rowNum === rowNum) {
  //       return block;
  //     }
  //   }
  // }

}
