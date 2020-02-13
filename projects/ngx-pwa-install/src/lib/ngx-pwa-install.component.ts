import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mapTo, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { BeforeInstallPrompt } from './ngx-pwa-install.providers';
import { BeforeInstallPromptEvent } from './before-install-prompt.event';

@Component({
  selector: 'ngx-pwa-install',
  template: `
    <ng-container *ngIf="beforeInstallPromptEvent">
      <ng-container *ngIf="choiceRequired|async">
        <ng-content></ng-content>
      </ng-container>
    </ng-container>
  `
})
export class NgxPwaInstallComponent implements OnInit, OnDestroy {
  @Output() prompt = new EventEmitter<BeforeInstallPromptEvent>();
  public beforeInstallPromptEvent: BeforeInstallPromptEvent;
  public readonly choiceRequired: Observable<boolean> = this.beforeInstallPrompt.pipe(
    switchMap(event => event.userChoice),
    mapTo(false),
    startWith(true)
  );
  private destroy = new Subject();

  constructor(
    @Inject(BeforeInstallPrompt)
    private readonly beforeInstallPrompt: Subject<any>
  ) {
  }

  ngOnInit(): void {
    this.beforeInstallPrompt.pipe(
      takeUntil(this.destroy)
    ).subscribe(
      (event) => {
        if (event) {
          this.prompt.emit(event);
        }
        this.beforeInstallPromptEvent = event;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = null;
  }

  install() {
    this.beforeInstallPromptEvent.prompt();
  }
}
