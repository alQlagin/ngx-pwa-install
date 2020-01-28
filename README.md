# NgxPwaInstall

Small wrapper with allows handle [beforeinstallprompt](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) event in angular way

Demo available [here](https://ngx-pwa-install.web.app/) 

## Install
Install from npm 
```
npm install ngx-pwa-install
```

and connect to main module to setup listeners

```typescript
@Component({
    imports: [NgxPwaInstallModule.forRoot()]
})
class AppModule {}
```

After installed module prevents default process of BeforeInstallPromptEvent

## Usage
To display custom PWA install popup wrap it with `<ngx-pwa-install></ngx-pwa-install>`

To proceed install request use `.install()` method of component

Positioning of install panel is your choice. Component does not add any css or block elements
 
```html
<ngx-pwa-install #pwa>
    <div class="pwa-install-panel" (click)="pwa.install()">
       Click to install
    </div>
</ngx-pwa-install>
```

To import only component outside of root module import module without `.forRoot()`

```typescript
@Component({
    imports: [NgxPwaInstallModule]
})
class FeatureModule {}
```
