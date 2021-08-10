import { Component } from '@angular/core';
import { VariablesGlobales } from '../variablesGlobales';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
      private http:HttpClient,
      private param: VariablesGlobales
  ) {
    this.getUserInfos();
  }

  colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];

  getUserInfos(){
    var userId = JSON.parse(localStorage.getItem('user')).id;
    var url = "http://www.fidelite.webantek.com/api/users/"+userId;
    this.http.get<any>(url).subscribe(data => { 
      console.log({
        type: "CONSOLE DATA",
        data: data
      })
      for(var i = 0; i < data.cards.length; i++){
        this.param.cards.push(data.cards[i]);
      }

      setTimeout(()=>{
        this.displayAvatar();
      },100)

      console.log({
        type: "CONSOLE CARDS",
        data: this.param.cards
      })
   
    }, error => {
      console.log({
        type: "CONSOLE ERROR",
        data: error.message
      })
    })     
  }

  generateAvatar(
    text:string,
    foregroundColor = "white",
    backgroundColor = "black"
  ) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    canvas.width = 200;
    canvas.height = 200;
  
    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw text
    context.font = "bold 100px arial";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  
    return canvas.toDataURL("image/png");
  }

  displayAvatar(){
    for(var i = 0; i < this.param.cards.length; i++){
      var initial = this.param.cards[i].commerce.nom.slice(0, 2);
      var ionAvatar = document.getElementById("avatar"+this.param.cards[i].id);
      var img = document.createElement('img');
      img.alt = "avatar de "+initial;
      img.src = this.generateAvatar(
        initial,
        "white",
        this.colors[Math.floor(Math.random()*19)]
      );
      ionAvatar.appendChild(img);
    }
  }

  mail(mail:string){
    window.open("mailto:"+mail+"?subject=Application Prim's Pro");
  }

   
  doRefresh(event) {
      setTimeout(() => {
        event.target.complete();
        window.location.reload();
      }, 2000);
  }

  ionViewWillEnter(){

    setTimeout(()=>{
      var body = document.getElementsByTagName('body');
      for(var i = 0; i < body.length; i++){
        body[i].classList.add('purpleBody');
      }
    },1000) 
  }

  ionViewWillLeave(){
    var body = document.getElementsByTagName('body');
    for(var i = 0; i < body.length; i++){
      body[i].classList.remove('purpleBody');
    }
  }

}
