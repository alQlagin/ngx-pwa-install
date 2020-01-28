import { InjectionToken } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export const beforeInstallPromptFactory = () => {
  const event$ = fromEvent<Event>(window, 'beforeinstallprompt')
    .pipe(
      tap(e => e.preventDefault()),
    );
  const beforeInstallPromptSubject = new ReplaySubject<Event>();
  event$.subscribe(beforeInstallPromptSubject);
  return beforeInstallPromptSubject;
};
export const BeforeInstallPrompt = new InjectionToken<ReplaySubject<Event>>('BeforeInstallPrompt', {
  providedIn: 'root',
  factory: beforeInstallPromptFactory
});
