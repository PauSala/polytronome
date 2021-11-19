import { Component, OnInit } from '@angular/core';
import { HandleFiguresServiceService } from '../services/handle-figures-service.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  /**fix-me to be int */
  public selectedFigure:string;

  constructor(private handleFiguresService: HandleFiguresServiceService) {
    this.selectedFigure = "2";
   }

  ngOnInit(): void {
  }

  public addFigure(){
    this.handleFiguresService.addFigureEmitter.emit(parseInt(this.selectedFigure));
  }
  public removeFigure(){
    this.handleFiguresService.removeFigureEmitter.emit(parseInt(this.selectedFigure));
  }

}
