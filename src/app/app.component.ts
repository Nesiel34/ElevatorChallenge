import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElevatorService } from './service/elevator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  public floors:number[] = [];
  top:number = 83;
  public interval:any;
  constructor(private elevatorService:ElevatorService) {}

  @ViewChild('elv') elv!: ElementRef;
  public audio = new Audio();

  ngAfterViewInit(){
    console.log(this.elv);
    console.log(this.elv.nativeElement.offsetTop);
  }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.floors.push(index);
    }
    this.floors = this.floors.reverse();


    this.audio.src = "../../assets/ding.mp3";
    this.audio.load();
    this.audio.loop = false;

    this.elevatorService.elevatorFloorMove$.subscribe(arg =>{
      if(arg){
        if(!this.interval){
          this.interval = setInterval(() => {
            if(this.elevatorService.direction=="up"){
              this.elv.nativeElement.style.top =this.elv.nativeElement.offsetTop -1 +"px";
            }
            else{
              this.elv.nativeElement.style.top =this.elv.nativeElement.offsetTop +1 +"px";
            }
          }, 1);
        }
      }
      else {
        if(this.interval){
          clearInterval(this.interval);
          this.interval = null;
        }
      }
    });


  }

  play(isPlay:boolean){
    if(isPlay){
      this.audio.play();
      this.audio.currentTime = 0;
    }
    else {
      this.audio.pause();

    }

  }


}


