import {Component, ElementRef, OnInit, OnDestroy, Input} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  private future: Date;
  private futureString: string;
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  message: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  @Input() inputDate: string;

  constructor(elm: ElementRef) {
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;


    return {
      days: days < 10 ? `0${days}` : days,
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds
    };
  }

  ngOnInit() {
    this.future = new Date(this.inputDate);
    this.$counter = Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
