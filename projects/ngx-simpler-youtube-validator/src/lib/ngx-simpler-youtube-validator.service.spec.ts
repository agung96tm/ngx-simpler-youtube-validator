import { NgxSimplerYoutubeValidatorService } from './ngx-simpler-youtube-validator.service';
import {of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

describe('NgxSimplerYoutubeValidatorService', () => {
  let service: NgxSimplerYoutubeValidatorService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new NgxSimplerYoutubeValidatorService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when action was received, understood, and accepted (2xx)', () => {
    const successResults = [{}];
    httpClientSpy.get.and.returnValue(of(successResults));

    service.isValid('idbefounded').subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  it('should return false when action was rejected, errors, etc (other than 2xx)', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service.isValid('idneverbefounded').subscribe(result => {
      expect(result).toBeFalse();
    });
  });
});
