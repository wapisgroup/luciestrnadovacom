import {Injectable}     from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NewsServices {

  constructor(private http: Http) {
    var obj;
    this.getJSON().subscribe(data => obj = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get("/assets/data/news.component.json")
      .map((res: any) => res.json())
      //.catch((error) => console.log(error));

  }
}
