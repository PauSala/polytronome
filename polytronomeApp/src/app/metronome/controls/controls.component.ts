import { Component, OnInit } from '@angular/core';
import { HandleFiguresServiceService } from '../services/handle-figures-service.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  /**fix-me to be int */
  public selectedFigure: string;
  public selectedTone: string;

  constructor(private handleFiguresService: HandleFiguresServiceService) {
    this.selectedFigure = "2";
    this.selectedTone = "metronome";
  }

  ngOnInit(): void {
  }

  public addFigure() {
    this.handleFiguresService.addFigureEmitter.emit(
      { figure: parseInt(this.selectedFigure), tone: this.selectedTone }
    );
  }
  public removeFigure() {
    this.handleFiguresService.removeFigureEmitter.emit(parseInt(this.selectedFigure));
  }

}
