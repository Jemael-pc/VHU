import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { LocationTracker } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    MapPage,
    LoginPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    MapPage,
    LoginPage,
    MainPage
  ],
  providers: [{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
  },
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    AuthHttp,
    provideAuth({
        headerName: 'Authorization',
        headerPrefix: 'bearer',
        tokenName: 'token',
        tokenGetter: (() => localStorage.getItem('id_token')),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: true
    })
    
  ]
})
export class AppModule {}
