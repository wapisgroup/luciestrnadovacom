import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ResultsComponent } from './results/results.component';
import { MyBagComponent } from './my-bag/my-bag.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NewsComponent } from './news/news.component';
import { TitleComponent } from './title/title.component';
import {OrderBy} from './filters/orderby';
import { FooterComponent } from './footer/footer.component';
import { TournamentComponent } from './tournament/tournament.component';
import { CountdownComponent } from './countdown/countdown.component';
import {ScrollToModule} from 'ng2-scroll-to';


// import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
// import { BowserService, BowserModule } from 'ngx-bowser';

//import { ORIGIN_URL } from './constants/baseurl.constants';



@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    NavigationComponent,
    AboutMeComponent,
    ResultsComponent,
    MyBagComponent,
    GalleryComponent,
    NewsComponent,
    TitleComponent,
    OrderBy,
    FooterComponent,
    TournamentComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ang4-seo-pre'}),
    FormsModule,
    HttpModule,
    ScrollToModule.forRoot(),
    BrowserModule,
    // BowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
