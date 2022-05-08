import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  public floors:number[] = [];


  ngOnInit(): void {
    for (let index = 0; index < 24; index++) {
      this.floors.push(index);
    }
  }


}


