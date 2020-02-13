import { Component, Inject, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SwUpdate } from '@angular/service-worker';
import { auditTime, bufferCount, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('installPwa', [
      state('false', style({
        transform: 'translateY(50%)',
        opacity: 0
      })),
      transition('* => false', [
        animate('.2s ease-out', style({
          transform: 'translateY(50%)',
          opacity: 0
        }))
      ]),
      transition(':leave', [
        animate('.2s ease-out', style({
          transform: 'translateY(50%)',
          opacity: 0
        }))
      ]),
      transition('false => *', [
        animate('.2s ease-out')
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'ngx-pwa-install-demo';
  dismissed = false;

  installExampleText = `
  @Module({
    ...
    import: [
      ...
      NgxPwaInstall.forRoot()
    ]
  })
  export class AppModule {}
  `;

  panelExampleText = `
  <ngx-pwa-install #pwa>
    <div class="pwa-install-panel">
      <mat-card>
        You can install this application to your device
        <button mat-raised-button
            color="primary"
            (click)="pwa.install()">
            INSTALL
        </button>
      </mat-card>
    </div>
  </ngx-pwa-install>
  `;
  showInstallPanel = false;

  constructor(
    private swUpdate: SwUpdate,
    @Inject(DOCUMENT)
    private document: Document,
  ) {
    if (swUpdate.isEnabled) {
      swUpdate.available.pipe(
        mergeMap(() => swUpdate.activateUpdate())
      ).subscribe(() => location.reload());
      swUpdate.checkForUpdate();
    }
  }

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(
        auditTime(100),
        map(() => window.pageYOffset),
        bufferCount(2, 1),
        map(([prev, curr]) => curr < prev),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.showInstallPanel = value;
      });
  }

  show() {
    this.showInstallPanel = true;
  }

  dismiss() {
    this.dismissed = true;
  }
}
