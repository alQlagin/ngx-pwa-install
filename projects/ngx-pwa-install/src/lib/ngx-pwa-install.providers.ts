import { InjectionToken } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BeforeInstallPromptEvent } from './before-install-prompt.event';

export const beforeInstallPromptFactory = () => {
  const event$ = fromEvent<BeforeInstallPromptEvent>(window, 'beforeinstallprompt')
    .pipe(
      tap(e => e.preventDefault()),
    );
  const beforeInstallPromptSubject = new ReplaySubject<BeforeInstallPromptEvent>();
  event$.subscribe(beforeInstallPromptSubject);
  return beforeInstallPromptSubject;
};
export const BeforeInstallPrompt = new InjectionToken<ReplaySubject<BeforeInstallPromptEvent>>(
  'BeforeInstallPrompt',
  {
    providedIn: 'root',
    factory: beforeInstallPromptFactory
  }
);
