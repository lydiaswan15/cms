import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = 'documents';

  switchView(selectedFeature: string){
    console.log(selectedFeature);
    this.selectedFeature = selectedFeature;
  } 
}
