import { Component, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { VariablesGlobales } from '../variablesGlobales';

import  QRCode  from 'easyqrcodejs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  constructor(
              private http:HttpClient,
              private param: VariablesGlobales
             ) {}
  
  email:string ;
  password:string ;
  nom:string ;
  prenom:string ;
  loading:boolean = false;
  security:boolean = true;
  userId:string ;     
  userName:string ;
  qrbool:boolean = false;
  memoriseId:boolean = false;

  @ViewChild("qrcodecolor", { static: false }) qrcodecolor: ElementRef;

  connexion(){
    let url = "http://www.fidelite.webantek.com/loginApi";
    this.loading = true;
    this.http.post(url, {
      email: this.email,
      password: this.password
    }).toPromise().then((response:any) => {
      var dataUser = response.data;
      var user = {
        id: dataUser.id,
        prenom: dataUser.prenom
      };
      localStorage.setItem('user', JSON.stringify(user));
      if(this.memoriseId === true){
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      }else{
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      this.setUser()
      this.loading = false;

      window.location.reload();
    }).catch(err => {
      console.log({
        type: "CONSOLE ERROR",
        data: err
      })
    })
  }

  securityChange(){
    if(this.security === true){
      this.security = false;
    }else{
      this.security = true;
    }
  }

  register(){
    let url = "http://www.fidelite.webantek.com/api/users/create";
    this.loading = true;
    this.http.post(url, {
      email: this.email,
      password: this.password,
      nom: this.nom,
      prenom: this.prenom
    }).toPromise().then((response:any) => {
      var dataUser = response['hydra:member'][1];
      var user = {
        id: dataUser.id,
        prenom: dataUser.prenom
      };
      localStorage.setItem('user', JSON.stringify(user));
      if(this.memoriseId === true){
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      }else{
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      this.setUser()
      this.loading = false;

      window.location.reload();
    })
  }

  setUser(){
    this.param.isLoggedIn = localStorage.getItem('user');
    if(this.param.isLoggedIn){
      this.userId = JSON.parse(localStorage.getItem('user')).id.toString();
      this.userName = JSON.parse(localStorage.getItem('user')).prenom;
    }
  }

  generateQRCode(){
    var options = {
      text: this.userId,
      colorDark: "#383a3e",
      dotScale: "0.5",
      backgroundImageAlpha: "0.3",
      width: 250,
      height: 250,
      // logoBackgroundColor: "#010600",
      // backgroundImage: "…/…/assets/terseLogo12.png",
      PO: "#800080",
      timing_H: "#13e768",
      timing_V: "#13e768",
      AO: "#0320F7",
    };

    new QRCode(this.qrcodecolor.nativeElement, options);

    this.qrbool = true;
  }

  ngOnInit(){
    this.setUser()
  }

  ionViewDidEnter(){
    if(this.param.isLoggedIn){
      if(this.qrbool === false){
        this.generateQRCode();
      }   
    }else{
      if(localStorage.getItem('email')){
        this.email = localStorage.getItem('email');
        this.password = localStorage.getItem('password');
        this.memoriseId = true;
      }
    }
  }
}
