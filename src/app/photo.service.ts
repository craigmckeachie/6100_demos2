import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './photo.model';
import { Observable } from 'rxjs';
import { retry, retryWhen, delay, take, concat } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/photos').pipe(
      // retry(3)
      retryWhen(error => {
        return error.pipe(
          delay(1000),
          take(5),
          concat(
            throwError({
              error: 'An error occured loading the photos.'
            })
          )
        );
      })
    );
  }
}
