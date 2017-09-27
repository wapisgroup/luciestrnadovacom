export {ScrollTo} from './scrollTo';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTo } from './scrollTo';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollTo,
  ],
  exports: [
    ScrollTo,
  ]
})
export class ScrollToModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScrollToModule
    };
  }
}
