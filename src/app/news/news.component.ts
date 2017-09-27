import {Component, OnInit} from '@angular/core';
import {ContentfulService} from './../contentful/contentful.service'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ContentfulService]
})
export class NewsComponent implements OnInit {

  results = [];

  constructor(private _contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this._contentfulService.getNews({order: '-fields.date'})
      .then(results => {

        this.results = results.map(res => {
          return res.fields
        })
      });
  }

  ngOnDestroy() {
    this.results = [];
  }

}
