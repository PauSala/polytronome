import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Metronome } from '../metronome/metronome';
import { drawFigures, drawMainCircle, getPoints } from './metronome-helpers';
import { Circle } from './types';

@Component({
  selector: 'app-metronome-layout',
  //template: `<canvas #myCanvas></canvas>`,
  templateUrl: './metronome-layout.component.html',
  styleUrls: ['./metronome-layout.component.css']
})
export class MetronomeLayoutComponent implements AfterViewInit {

  @ViewChild('myCanvas')
  private canvas: ElementRef = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D;

  public cw: number = 300; // the width of the canvas  this.canvas.width = 300;
  public ch: number = 300; // this.canvas.height = 300; // the height of the canvas
  public c: Circle = { // the circle: coords of the center and the radius
    x: 150,
    y: 150,
    r: 120
  }

  public metronome!: Metronome;

  constructor() { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = this.cw;
    this.canvas.nativeElement.height = this.ch;

    this.metronome = new Metronome(100, [2], this.cw, this.ch, this.c, this.ctx);
    this.metronome.startStop();
    this.draw
  }

  public draw() {

    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const points = getPoints(this.metronome.groups, this.c);
    drawMainCircle(ctx, this.c);
    drawFigures(points, this.metronome.groups, ctx);
  }

}
