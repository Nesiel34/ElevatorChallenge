import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  constructor() { }

  private elevatorFloorMove:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public elevatorFloorArr:number[] = [];
  public isElevatorFloorMove:boolean =false;
  public direction:string = "up";
  public lastFloor:number = 0;

  setElevatorFloor(floorNum:number,arrive:boolean){
    if(arrive){

      this.elevatorFloorArr = this.elevatorFloorArr.filter(s=>s!=floorNum);
      this.lastFloor = floorNum;
    }
    else {
      this.elevatorFloorArr.push(floorNum);
        if(this.lastFloor<floorNum){
          this.direction="up";
        }
        else {
          this.direction="down";
        }
    }
  }

  get elevatorFloorMove$() {
    return this.elevatorFloorMove.asObservable();
  }

  setElevatorFloorMove(move:boolean){
    this.elevatorFloorMove.next(move);
  }

}
