import { Component, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { BeforeInstallPrompt, NgxPwaInstallModule } from '../public-api';

@Component({
  template: ''
})
class FakeComponent {
}

function configureComponentFactory(
  targetModule: ModuleWithProviders<NgxPwaInstallModule> | Type<any>,
  beforeInstallPromptFactory: () => Promise<void>) {
  return createComponentFactory({
    component: FakeComponent,
    imports: [targetModule],
    providers: [
      {provide: BeforeInstallPrompt, useFactory: beforeInstallPromptFactory}
    ]
  });
}

describe('NgxPwaInstallModule', () => {
  let spectator: Spectator<FakeComponent>;
  let spyInit: jasmine.Spy;
  const beforeInstallPromptProvider = {
    init() {
      return Promise.resolve();
    }
  };
  const beforeInstallPromptFactory = () => beforeInstallPromptProvider.init();

  describe('without .forRoot()', () => {
    const createComponent = configureComponentFactory(NgxPwaInstallModule, beforeInstallPromptFactory);

    beforeEach(() => {
      spyInit = spyOn(beforeInstallPromptProvider, 'init');
      spectator = createComponent();
    });

    it('should not setup window event listener', () => {
      expect(spyInit).not.toHaveBeenCalled();
    });
  });
  describe('with .forRoot()', () => {
    const targetModule = NgxPwaInstallModule.forRoot();
    const createComponent = configureComponentFactory(targetModule, beforeInstallPromptFactory);

    beforeEach(() => {
      spyInit = spyOn(beforeInstallPromptProvider, 'init');
      spectator = createComponent();
    });

    it('should setup window event listener', () => {
      expect(spyInit).toHaveBeenCalled();
    });
  });
});

