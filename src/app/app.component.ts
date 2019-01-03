import { Component, OnInit } from '@angular/core';
import { Photo } from './photo.model';
import { PhotoService } from './photo.service';
import { retry, retryWhen, delay, take, concat } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Photos</h1>
    <div *ngFor="let photo of photos">
      <img [src]="photo.thumbnailUrl" />
      <p>{{ photo.title }}</p>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  photos: Photo[];
  constructor(private photoService: PhotoService) {}
  ngOnInit(): void {
    this.photoService
      .getAll()
      .pipe(
        // retry(3)
        retryWhen(error => {
          return error.pipe(
            delay(1000),
            take(5),
            concat(
              throwError({
                error: 'Sorry, there was an error (after 5 retries)'
              })
            )
          );
        })
      )
      .subscribe(data => (this.photos = data));
  }
}
