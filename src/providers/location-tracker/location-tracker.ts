import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { BehaviorSubject, Subscription, Observable, Observer  } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class LocationTracker {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public adress: string = null;
 
  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, private http: Http, private authHttp: AuthHttp, public geolocation: Geolocation) {
 
  }
 
  startTracking() {
    
     // Background Tracking
    
     let config = {
       desiredAccuracy: 0,
       stationaryRadius: 20,
       distanceFilter: 10,
       debug: true,
       interval: 2000
     };
    
     this.backgroundGeolocation.configure(config).subscribe((location) => {
    
       console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    
       // Run update inside of Angular's zone
       this.zone.run(() => {
         this.lat = location.latitude;
         this.lng = location.longitude;
       });
    
     }, (err) => {
    
       console.log(err);
    
     });
    
     // Turn ON the background-geolocation system.
     this.backgroundGeolocation.start();
    
    
     // Foreground Tracking
    
   let options = {
     frequency: 3000,
     enableHighAccuracy: true
   };
    
   this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    
     console.log(position);

     // Run update inside of Angular's zone
     this.zone.run(() => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
       if(this.lat != 0 && this.lng != 0){
        this.getAdresseGoogleMap(this.lat, this.lng).subscribe(res => {
          console.log(res);
          console.log(res['results'][0].formatted_address);
          this.adress = res['results'][0].formatted_address;
        })
      }
     });

    
   });
    
   }
 
   stopTracking() {
    
     console.log('stopTracking');
    
     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();
    
   }

  cleanTracking(){
     console.log("cleanTracking");

    this.lat = 0;
    this.lng = 0;
  }


  getAdresseGoogleMap(lat, lng){
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat +','+ lng + '&sensor=true';
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

}