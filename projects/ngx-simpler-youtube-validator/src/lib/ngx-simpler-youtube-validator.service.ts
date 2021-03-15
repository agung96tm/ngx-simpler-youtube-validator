import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgxSimplerYoutubeValidatorService {
  baseUrl = 'https://youtube.com/oembed';

  constructor(
    private httpClient: HttpClient,
  ) { }

  isValid(youtubeId: string): Observable<unknown> {
    const params = new HttpParams({
      fromObject: {
        url: `http://www.youtube.com/watch?v=${youtubeId}`,
        format: 'json',
      },
    });

    return this.httpClient.get(`${this.baseUrl}`, { params }).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
