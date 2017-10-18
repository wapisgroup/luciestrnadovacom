import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Jsonp} from '@angular/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class InstagramService {

  images: BehaviorSubject<any[]>;

  constructor(private _jsonp: Jsonp) {
    this.images = new BehaviorSubject([]);
  }

  load() {
    let postfix = '?access_token=32442758.1677ed0.cec5719e27774145a257814ca922f4c8&callback=JSONP_CALLBACK';
    let url1 = 'https://api.instagram.com/v1/users/32442758/media/recent/'

    this._jsonp.get(`${url1}${postfix}`)
      .map((res: Response) => res.json())
      .subscribe((resp) => {
        console.log(resp.data)
        this.images.next(resp.data);
      })

  }

}
