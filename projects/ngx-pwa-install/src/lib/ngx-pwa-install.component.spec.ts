import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { NgxPwaInstallComponent } from './ngx-pwa-install.component';
import { fakeAsync, tick } from '@angular/core/testing';

function createEvent() {
  const event = new CustomEvent('beforeinstallprompt');
  let userChoiceResolve;
  (event as any).userChoice = new Promise((resolve) => userChoiceResolve = resolve);
  (event as any).prompt = () => {
    userChoiceResolve({outcome: 'accepted'});
  };
  return event;
}

describe('NgxPwaInstallComponent', () => {
  let spectator: SpectatorHost<NgxPwaInstallComponent>;
  const createHost = createHostFactory(NgxPwaInstallComponent);

  beforeEach(() => {
    spectator = createHost(`<ngx-pwa-install><button class="install-me">Install me</button></ngx-pwa-install>`);
  });
  it('should not display content until BeforeInstallPromptEvent fired', () => {
    spectator.detectChanges();
    expect(spectator.query('.install-me')).toBeNull();
  });
  it('should display content when BeforeInstallPromptEvent fired', () => {
    window.dispatchEvent(createEvent());
    spectator.detectChanges();
    expect(spectator.query('.install-me')).not.toBeNull();
  });
  it('should hide content when .install() called', fakeAsync(() => {
    const event = createEvent();
    window.dispatchEvent(event);
    spectator.detectChanges();
    spectator.component.install();
    tick(0);
    spectator.detectChanges();
    expect(spectator.query('.install-me')).toBeNull();
  }));
  it('should emit shown when BeforeInstallPromptEvent fired', () => {
    let output;
    const event = createEvent();
    spectator.output('prompt').subscribe(result => output = result);
    window.dispatchEvent(event);
    spectator.detectChanges();
    expect(output).toBe(event);
  });
});
