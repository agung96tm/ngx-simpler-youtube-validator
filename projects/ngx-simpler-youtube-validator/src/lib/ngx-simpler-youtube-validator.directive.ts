import {Directive, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NgxSimplerYoutubeValidatorService } from './ngx-simpler-youtube-validator.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

const YOUTUBE_URL = 'https://www.youtube.com';

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
  @Input() forceFixUrl = false;

  private canForceFixUrl(): boolean {
    return (this.isYoutubeUrl && this.forceFixUrl);
  }

  forceUpdateUrl(isValid: boolean, value: string): void {
    if (isValid && this.canForceFixUrl()) {
      this.el.nativeElement.value = `${YOUTUBE_URL}/watch?v=${value}`;
    }
  }

  constructor(
    private validatorService: NgxSimplerYoutubeValidatorService,
    private el: ElementRef,
  ) { }

  validate({ value }: AbstractControl): Observable<ValidationErrors | null> {
    value = this.isYoutubeUrl ? this.getYoutubeIdFromUrl(value) : value;

    return timer(800).pipe(
      switchMap(() => this.validatorService.isValid(value)),
      tap(isValid => this.forceUpdateUrl(isValid, value)),
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
