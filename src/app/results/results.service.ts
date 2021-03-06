import {Component, Input} from '@angular/core';
import {  Inject } from '@angular/core';


import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { InjectionToken } from '@angular/core';

// export const ORIGIN_URL = new InjectionToken<string>('ORIGIN_URL');

@Injectable()
export class ResultServices {

  constructor(private http: Http) {
    var obj;
    this.getJSON().subscribe(data => obj = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get("/assets/data/results.component.json")
      .map((res: any) => res.json())
      //.catch((error) => console.log(error));

  }
}
