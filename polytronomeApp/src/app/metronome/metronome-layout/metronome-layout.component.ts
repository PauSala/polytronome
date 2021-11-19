import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Metronome } from '../metronome/metronome';
import { ClickEvent } from '../metronome/types';
import { HandleFiguresServiceService } from '../services/handle-figures-service.service';
import { animate, drawFigures, drawMainCircle, getPoints } from './metronome-layout.helpers';
import { Circle, Figure } from './types';

@Component({
  selector: 'app-metronome-layout',
  templateUrl: './metronome-layout.component.html',
  styleUrls: ['./metronome-layout.component.css']
})
export class MetronomeLayoutComponent implements AfterViewInit {

  @ViewChild('myCanvas')
  private canvas: ElementRef = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D;

  public cw: number = 300; // the width of the canvas  this.canvas.width = 300;
  public ch: number = 300; // this.canvas.height = 300; // the height of the canvas
  public c: Circle = { x: 150, y: 150, r: 120 } // the circle: coords of the center and the radius

  public metronome!: Metronome;
  public tempo:number;

  constructor(private handleFiguresService: HandleFiguresServiceService) { 

    this.tempo = 100;

    this.handleFiguresService.addFigureEmitter.subscribe((figure:Figure) => {
      this.metronome.addFigure(figure);
      this.draw();
    });
    this.handleFiguresService.removeFigureEmitter.subscribe((figure:Figure) => {
      this.metronome.removeFigure(figure);
      this.draw();
    });

  }

  ngAfterViewInit(): void {
    
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = this.cw;
    this.canvas.nativeElement.height = this.ch;

    this.metronome = new Metronome(this.tempo, []);
    this.metronome.clickEventEmitter.subscribe((animateEvent:ClickEvent) => {
      animate(animateEvent, this.cw, this.ch, this.ctx, this.c);
    });

    this.draw();
  }

  public draw() {

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const points = getPoints(this.metronome.groups, this.c);
    drawMainCircle(this.ctx, this.c);
    drawFigures(points, this.metronome.groups, this.ctx);
  }

  public increaseTempo(){
    this.tempo ++;
    this.metronome.increaseTempo()
  }
  public decreaseTempo(){
    this.tempo --;
    this.metronome.decreaseTempo();
  }

}