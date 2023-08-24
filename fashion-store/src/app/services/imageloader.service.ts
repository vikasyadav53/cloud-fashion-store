import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  Observable,
  Observer,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  private BASE_URL = 'http://localhost:8081/';

  constructor(private http: HttpClient) {}

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    // This will draw image
    if (ctx != null) ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  putDataParallel(urls: Array<string>) {
    let success = 0; // <-- trivial counters
    let errors = 0;

    const reqs = urls.map(
      (
        url // <-- replate `this.urls` with your object array
      ) =>
        this.http.get(url).pipe(
          // <-- replace `url` with your own PUT request
          tap((_) => success++), // <-- count successful responses here
          catchError((err) => {
            errors++; // <-- count errors here
            return of(err); // <-- remember to return an observable from `catchError`
          })
        )
    );

    forkJoin(reqs).subscribe(
      null, // <-- you could change response callback to your requirement
      (err) => console.log(err),
      () => console.log(`Success: ${success}\nErrors: ${errors}`)
    );
  }

  putDataSequential(urls: Array<string>) {
    let success = 0; // <-- trivial counters
    let errors = 0;

    from(urls)
      .pipe(
        // <-- replate `this.urls` with your object array
        concatMap((url) => {
          return this.http.get(url).pipe(
            // <-- replace `url` with your own PUT request
            tap((_) => success++), // <-- count successful responses here
            catchError((err) => {
              errors++; // <-- count errors here
              return of(err); // <-- remember to return an observable from `catchError`
            })
          );
        })
      )
      .subscribe(
        null, // <-- you could change response callback to your requirement
        (err) => console.log(err),
        () => console.log(`Success: ${success}\nErrors: ${errors}`)
      );
  }
}
