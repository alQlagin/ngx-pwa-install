import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SwUpdate } from '@angular/service-worker';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('installPwa', [
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

  constructor(
    private swUpdate: SwUpdate
  ) {
    if (swUpdate.isEnabled) {
      swUpdate.available.pipe(
        mergeMap(() => swUpdate.activateUpdate())
      ).subscribe(() => location.reload());
      swUpdate.checkForUpdate();
    }
  }

  dismiss() {
    this.dismissed = true;
  }
}
