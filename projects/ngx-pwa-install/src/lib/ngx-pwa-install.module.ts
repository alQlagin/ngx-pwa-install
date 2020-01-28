import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPwaInstallComponent } from './ngx-pwa-install.component';
import { BeforeInstallPrompt } from './ngx-pwa-install.providers';

export const beforeInstallPromptInitializerFactory = (beforeInstallPrompt) => {
  return async () => beforeInstallPrompt;
};

@NgModule({
  declarations: [NgxPwaInstallComponent],
  imports: [
  ],
  exports: [NgxPwaInstallComponent]
})
export class NgxPwaInstallModule {
  static forRoot(): ModuleWithProviders<NgxPwaInstallModule> {
    return {
      ngModule: NgxPwaInstallModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: beforeInstallPromptInitializerFactory,
          deps: [BeforeInstallPrompt],
          multi: true
        }
      ]
    };
  }
}
