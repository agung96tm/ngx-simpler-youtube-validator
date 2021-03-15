import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxSimplerYoutubeValidatorDirective } from './ngx-simpler-youtube-validator.directive';

@NgModule({
  declarations: [
    NgxSimplerYoutubeValidatorDirective,
  ],
  imports: [
    HttpClientModule,
  ],
  exports: []
})
export class NgxSimplerYoutubeValidatorModule { }
