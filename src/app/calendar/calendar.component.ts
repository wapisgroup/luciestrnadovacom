import {Component, OnInit, Input} from '@angular/core';
import {ContentfulService} from './../contentful/contentful.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

function monthDays(date) {
  var d = new Date(date.getFullYear(), date.getMonth(), 0);
  return d.getDate();
}

function addDays(self, days) {
  var date = new Date(self);
  date.setDate(date.getDate() + days);
  return date;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [ContentfulService]
})
export class CalendarComponent implements OnInit {

  constructor(private _contentfulService: ContentfulService) {
  }

  public tournaments = {};
  public list = [];
  private _dates = [];
  public tourSubject:BehaviorSubject<any>;

  ngOnInit() {
    this.list = [
      new Date('September 1 2017'),
      new Date('October 1 2017'),
      new Date('November 1 2017'),
      new Date('December 1 2017'),
      new Date('January 1 2018'),
      new Date('February 1 2018'),
      new Date('March 1 2018'),
      new Date('May 1 2018'),
      new Date('June 1 2018'),
      new Date('July 1 2018'),
      new Date('August 1 2018'),
      new Date('September 1 2018'),
    ];

    this.getData();

    this.tourSubject = new BehaviorSubject({});


  }

  addDate(date: Date, item) {
    if (typeof this.tournaments[date.getUTCFullYear()] === 'undefined') {
      this.tournaments[date.getUTCFullYear()] = {};
    }
    if (typeof this.tournaments[date.getUTCFullYear()][date.getMonth()] === 'undefined') {
      this.tournaments[date.getUTCFullYear()][date.getMonth()] = {};
    }

    this.tournaments[date.getUTCFullYear()][date.getMonth()][date.getDate()] = item;
  }

  getData() {
    this._contentfulService.getTournaments({order: 'fields.date'})
      .then(results => {

        results.forEach((item) => {
          let from = new Date(item.fields.date);

          if (typeof item.fields.dateTo !== 'undefined' && item.fields.dateTo !== '') {
            let list = (getDates(new Date(item.fields.date), new Date(item.fields.dateTo)))
            for (let x = 0; x < list.length; x++){
              this.addDate(list[x], item.fields);
            }

          } else {
            this.addDate(new Date(item.fields.date), item.fields);
          }
        });

        this.tourSubject.next(this.tournaments);
      });
  }


}
