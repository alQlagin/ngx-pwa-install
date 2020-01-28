import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPwaInstallComponent } from './ngx-pwa-install.component';
import { BeforeInstallPrompt } from './ngx-pwa-install.providers';

@NgModule({
  declarations: [NgxPwaInstallComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxPwaInstallComponent]
})
export class NgxPwaInstallModule {
  static forRoot(): ModuleWithProviders<NgxPwaInstallModule> {
    const beforeInstallPromptInitializerFactory = beforeInstallPrompt => {
      return () => Promise.resolve(beforeInstallPrompt);
    };

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
