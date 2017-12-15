import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../../pages/map/map';
import { LoginPage } from '../../pages/login/login';
import { MainPage } from '../../pages/main/main';
import { Camera, CameraOptions } from '@ionic-native/camera';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPage: any;
  pushPage2: any;
  pushPage3: any;
  public photos : any;
  public base64Image : string;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, private camera: Camera, public alertCtrl: AlertController) {
    this.pushPage = MapPage;
    this.pushPage2 = LoginPage;
    this.pushPage3 = MainPage;
  }

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }

   takePhoto() {
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }

 
}



