import {Component, OnInit} from '@angular/core';
//import {TournamentServices} from './tournament.service';
import {ContentfulService} from './../contentful/contentful.service'
//import {OrderBy} from './../filters/orderby';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  providers: [ContentfulService]
})
export class TournamentComponent implements OnInit {

  constructor(private _contentfulService: ContentfulService) {
  }

  result = null;

  ngOnInit() {
    this._contentfulService.getTournaments({order: 'fields.date'})
      .then(results => {
        let found = null;
        for (let itm of results) {
            let field = itm.fields;

          if (new Date(field.date) > new Date()) {
            found = field;
            break;
          }
        }

        if (found !== null) {
          this.result = found;
        }
      });
  }

  ngOnDestroy() {
    this.result = null;
  }

}
