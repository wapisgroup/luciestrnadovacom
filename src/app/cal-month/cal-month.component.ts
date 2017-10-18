import {Component, OnInit, Input} from '@angular/core';

function monthDays(date) {
  var d = new Date(date.getFullYear(), date.getMonth()-1, 0);
  return d.getDate();
}

let langMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

@Component({
  selector: 'cal-month',
  templateUrl: './cal-month.component.html',
  styleUrls: ['./cal-month.component.scss']
})
export class CalMonthComponent implements OnInit {

  constructor() {
  }

  @Input() private date;
  @Input() private tournaments;
  public _dates = [];
  public title = '';

  public calendar = [];

  ngOnInit() {
    this.generateDates();
    this.title = `${langMonths[this.date.getMonth()]}  ${this.date.getUTCFullYear()}`;

    this.tournaments.subscribe(data => {
      if (typeof data[this.date.getFullYear()] == 'undefined' || typeof data[this.date.getFullYear()][this.date.getMonth()] == 'undefined'){
        this._dates = [];
      } else {
        this._dates = data[this.date.getFullYear()][this.date.getMonth()];
      }

    })


    //
  }

  generateDates() {

    let cal = [];

    let currentMonth = this.date.getMonth();
    let currentYear = this.date.getFullYear();

    let row = [];
    let dayInWeek = this.date.getDay();
    if (dayInWeek == -1) dayInWeek = 7;

    if (dayInWeek > 1) {
      for (let k = 1; k < dayInWeek; k++) {
        row.push('empty');
      }
    }

    for (let i = 1; i <= monthDays(this.date); i++) {
      let tmpDate = new Date(currentYear, currentMonth, i);

      if (row.length < 6) {
        row.push(tmpDate.getDate());
      } else {
        row.push(tmpDate.getDate());
        cal.push(row);
        row = [];
      }
    }

    if (row.length !== 0) {

      for (let k = row.length; k < 7; k++) {
        row.push('empty');
      }
      cal.push(row);
    }
    this.calendar = cal;
  }

}
