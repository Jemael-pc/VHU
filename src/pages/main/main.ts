import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { BehaviorSubject, Subscription, Observable, Observer  } from 'rxjs';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    
  }

  @ViewChild('map') mapElement: ElementRef;
  map: any = null;


  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, public geolocation: Geolocation) {
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
  clean(){
    this.locationTracker.cleanTracking();
  }



  loadMap(){
    
       this.geolocation.getCurrentPosition().then((position) => {
    
         let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
         let mapOptions = {
           center: latLng,
           zoom: 15,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         }
    
         this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
       }, (err) => {
         console.log(err);
       });
    
     }
   
     addMarker(){
       
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });
       
        let content = "<h4>Information!</h4>";         
       
        this.addInfoWindow(marker, content);
       console.log("Position: ", marker.position);

    }


   
      addInfoWindow(marker, content){
       
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });
       
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
       
      }

}
