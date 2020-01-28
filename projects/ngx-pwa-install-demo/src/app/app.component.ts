import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('installPwa', [
      transition(':enter', [
        style({
          transform: 'translateY(50%)',
          opacity: 0
        }),
        animate('.2s ease-out')
      ]),
      transition(':leave', [
        animate('.2s ease-out', style({
          transform: 'translateY(50%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ngx-pwa-install-demo';
}
