import { Component, OnInit } from '@angular/core';
import { Figure } from '../metronome-layout/types';
import { HandleFiguresServiceService } from '../services/handle-figures-service.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  /**fix-me to be int */
  public selectedFigure: string;
  public selectedTone: string;
  public figures:Array<string>;

  constructor(private handleFiguresService: HandleFiguresServiceService) {
    this.selectedFigure = "2";
    this.selectedTone = "metronome";
    this.figures=[];
  }

  ngOnInit(): void {
  }

  public addFigure() {
    this.figures.push(this.selectedFigure);
    this.handleFiguresService.addFigureEmitter.emit(
      { figure: parseInt(this.selectedFigure), tone: this.selectedTone }
    );
  }
  public removeFigure() {
    this.figures = this.figures.filter(f => f !== this.selectedFigure);
    this.handleFiguresService.removeFigureEmitter.emit(parseInt(this.selectedFigure));
  }

  public removeClickedFigure(figure:Figure){
    this.figures = this.figures.filter(f => f !== `${figure}`);
    this.handleFiguresService.removeFigureEmitter.emit(figure);
  }

}
