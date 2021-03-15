import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NgxSimplerYoutubeValidatorService } from './ngx-simpler-youtube-validator.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[simplerYoutubeValidator][formControl], [simplerYoutubeValidator][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NgxSimplerYoutubeValidatorDirective),
      multi: true,
    }
  ]
})
export class NgxSimplerYoutubeValidatorDirective implements Validator {
  @Input() isYoutubeUrl = false;

  constructor(
    private validatorService: NgxSimplerYoutubeValidatorService,
  ) { }

  validate({ value }: AbstractControl): Observable<ValidationErrors | null> {
    value = this.isYoutubeUrl ? this.getYoutubeIdFromUrl(value) : value;

    return timer(800).pipe(
      switchMap(() => this.validatorService.isValid(value)),
      map(isValid => isValid ? null : { youtubeValidator: true }),
    );
  }

  getYoutubeIdFromUrl(url: string): string {
    return this.getQueryString('v', url);
  }

  getQueryString(field, url): string {
    const href = url ? url : window.location.href;
    const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    const str = reg.exec(href);
    return str ? str[1] : null;
  }
}
