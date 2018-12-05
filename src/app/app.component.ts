import { Component, OnInit } from '@angular/core';
import { of, Observer, interval } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: ``,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Emits ascending numbers, one every second (1000ms)
    const observable$ = interval(1000);
    const observer: Observer<any> = {
      next: x => console.log(x),
      complete: () => console.log('completed'),
      error: x => console.log(x)
    };

    const observableCommingOutOfThePipe$ = observable$.pipe(
      filter(x => x % 2 === 0)
    );

    observableCommingOutOfThePipe$.subscribe(observer);

    // interval(1000)
    //   .pipe(filter(x => x % 2 === 0))
    //   .subscribe(x => console.log(x));
  }
}
