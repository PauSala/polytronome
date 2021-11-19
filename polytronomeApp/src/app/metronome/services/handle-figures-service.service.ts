import { EventEmitter, Injectable } from '@angular/core';
import { Figure } from '../metronome-layout/types';



@Injectable({
  providedIn: 'root'
})
export class HandleFiguresServiceService {

  public addFigureEmitter: EventEmitter<Figure>;
  public removeFigureEmitter: EventEmitter<Figure>;

  constructor() { 
    this.addFigureEmitter = new EventEmitter;
    this.removeFigureEmitter = new EventEmitter;
  }
}
