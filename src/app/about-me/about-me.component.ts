import { Component, OnInit } from '@angular/core';
import {ContentfulService} from "../contentful/contentful.service";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  providers: [ContentfulService]
})
export class AboutMeComponent implements OnInit {

  constructor(private _contentfulService: ContentfulService) { }
  aboutText = [];
  aboutFacts = [];

  ngOnInit() {
    this._contentfulService.getAbout().then(data => {
      this.aboutText = data.map((item) => item.fields.test);
    })

    this._contentfulService.getAboutFacts({order: 'fields.order'}).then(data => {
      this.aboutFacts = data.map((item) => item.fields);
    })
  }

}
