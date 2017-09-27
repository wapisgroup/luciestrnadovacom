import {Component, OnInit, OnDestroy} from '@angular/core';
import {ContentfulService} from './../contentful/contentful.service'


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [ContentfulService]
})
export class ResultsComponent implements OnInit, OnDestroy {

  results = [];

  constructor(private _contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this._contentfulService.getResults({order: 'fields.date'})
      .then(results => {

        this.results = results.map(res => {
          res.fields.category = res.fields.category.split('|');
          res.fields.rank = res.fields.rank.split('|');
          return res.fields
        })
      });
  }


  ngOnDestroy() {
    this.results = [];
  }

  isArray(value:any){
    return value instanceof Array;
  }

}
