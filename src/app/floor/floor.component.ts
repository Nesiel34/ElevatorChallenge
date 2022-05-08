import { Component, ElementRef, Input, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';
import { ElevatorService } from '../service/elevator.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  constructor(private elevatorService:ElevatorService,private elRef: ElementRef) { }



  @Input() floorNum:number = 0;
  @Output() playAudio:EventEmitter<boolean> = new EventEmitter<boolean>();

  active:boolean = false;
  public interval:any;

  @ViewChild('floor') floor!: ElementRef;
  @ViewChild('audioPlayerRef')  audioPlayerRef!: ElementRef;



  ngOnInit(): void {
    console.log(this.elRef.nativeElement.parentElement.elv);

    this.elevatorService.elevatorFloorMove$.subscribe(s=>{

      const parentElement = this.elRef.nativeElement.parentElement.querySelector('#elv');

      if(s && this.active && !this.interval){

       this.interval =  setInterval(() => {
        let topParent = parentElement.getBoundingClientRect().top;
        let topFloor = this.floor.nativeElement.getBoundingClientRect().top;
        let height = this.floor.nativeElement.getBoundingClientRect().height;
          if(this.elevatorService.direction== "down"  && topParent >= topFloor  && topParent >= ((topFloor-height))
          ||(this.elevatorService.direction== "up"  && topParent <= topFloor  && topParent <= ((topFloor+height))))
          {
            this.active = false;
            clearInterval(this.interval);
            this.interval = null;
            this.elevatorService.setElevatorFloor(this.floorNum,true);
            this.elevatorService.setElevatorFloorMove(false);
            this.playAudio.emit(true);
            setTimeout(() => {
              if(this.elevatorService.elevatorFloorArr.length>0){
                this.elevatorService.setElevatorFloorMove(true);
              }
              this.playAudio.emit(false);
            }, 2000);
          }
        }, 100);
      }
    });

  }
  Elevator(){
    this.elevatorService.setElevatorFloor(this.floorNum,false);
    this.active = true;
    this.elevatorService.setElevatorFloorMove(true);
  }

}
