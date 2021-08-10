import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VariablesGlobales } from '../variablesGlobales';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(
    private param: VariablesGlobales,
    private changeRef: ChangeDetectorRef,
    private socialSharing: SocialSharing
  ) { }

  selectedText:string;


  disconnect(){
    localStorage.removeItem('user');
    localStorage.removeItem('commerceSelected');
    window.location.replace('/');
  }


  share(){
    var opts = {
      message: "Viens découvrir l'application Prim's !",
      subject: "Prim's",
      url: "http://www.fidelite.webantek.com"
    }
    this.socialSharing.shareWithOptions(opts).catch(function(error) {
      console.log('Error sharing:', error)
    });
    // this.socialSharing.share("Viens découvrir l'application Prim's Pro !", "Prim's Pro", ["http://www.fidelite.webantek.com"])
  }

  mail(){
    window.open("mailto:contact@webantek.com?subject=Application Prim's");
  }


  ngOnInit() {
    
    
  }

  ionViewDidEnter(){
    this.selectedText = localStorage.getItem('nomCommerceSelected');
  }

}
