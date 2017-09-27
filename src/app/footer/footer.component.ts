import {Component, OnInit} from '@angular/core';
import {ContentfulService} from './../contentful/contentful.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [ContentfulService]
})

export class FooterComponent implements OnInit {

  news = [];

  constructor(private _contentfulService: ContentfulService) {
  }

  ngOnInit() {
    // this._contentfulService.getNews({order: '-fields.date', limit: 2})
    //   .then(results => {
    //
    //     this.news = results.map(res => {
    //       return res.fields
    //     })
    //   });
  }

  ngOnDestroy() {
    this.news = [];
  }

}
