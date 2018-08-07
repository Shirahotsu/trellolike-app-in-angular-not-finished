import { Injectable } from "@angular/core";


@Injectable()
export class Globals {

  public isCreatingTable: boolean = false;
  get(){
  console.log(this.isCreatingTable);
  }
}
