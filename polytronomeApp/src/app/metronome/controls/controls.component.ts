import { Component, OnInit } from '@angular/core';
import { HandleFiguresServiceService } from '../services/handle-figures-service.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  public selectedFigure:number;

  constructor(private handleFiguresService: HandleFiguresServiceService) {
    this.selectedFigure = 2;
   }

  ngOnInit(): void {
  }

  public addFigure(){
    this.handleFiguresService.addFigureEmitter.emit(this.selectedFigure);
  }
  public removeFigure(){
    this.handleFiguresService.removeFigureEmitter.emit(this.selectedFigure);
  }

}
