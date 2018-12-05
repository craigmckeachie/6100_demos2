import { Component, OnInit } from '@angular/core';
import { of, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ``,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const observable$ = of(1, 2, 3);
    const observer: Observer<any> = {
      next: x => console.log(x),
      complete: () => console.log('completed'),
      error: x => console.log(x)
    };
    observable$.subscribe(observer);
  }
}
