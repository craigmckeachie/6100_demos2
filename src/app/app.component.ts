import { Component, OnInit } from '@angular/core';
import { of, Observer, interval } from 'rxjs';

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
    const subscription = observable$.subscribe(observer);
    setTimeout(() => subscription.unsubscribe(), 5000);
  }
}
