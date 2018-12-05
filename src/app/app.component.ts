import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <button>Click Me</button> <input type="text" />
  `,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const observable$ = of(1, 2, 3);
    observable$.subscribe(x => console.log(x));

    // don't do direct DOM manipulation in Angular components
    // we'll see how to avoid this later in these demos
    const button = document.querySelector('button');
    const clicks$ = fromEvent(button, 'click');
    clicks$.subscribe(x => console.log(x));

    const input = document.querySelector('input');
    const keyupEvents$ = fromEvent(input, 'keyup');
    keyupEvents$.subscribe((x: Event) =>
      console.log((<HTMLInputElement>x.target).value)
    );
  }
}
