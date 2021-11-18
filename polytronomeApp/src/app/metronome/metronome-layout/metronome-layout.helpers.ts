import { ClickEvent } from "../metronome/types";
import { lcm_two_numbers } from "../utils/lcm";
import { Circle, FigureSet, Point } from "./types";

export const drawMainCircle = (ctx: CanvasRenderingContext2D, c: Circle): void => {

    ctx.save();
    ctx.shadowColor = 'white'
    ctx.shadowBlur = 10;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fillStyle = getMainGradient(ctx, c);
    ctx.fill();
    ctx.restore();
}


export const getPoints = (groups: FigureSet, c: Circle) => {

    let subdivision = groups.reduce((a, b) => lcm_two_numbers(a, b), 1);
    let angle = (2 * Math.PI) / subdivision; // the angle between vertices
    let points = []; // the vertices array

    for (let i = 0; i < subdivision; i++) {
        let o: Point = { x: 0, y: 0 };
        o.x = c.x + c.r * Math.sin(i * angle);
        o.y = c.y - c.r * Math.cos(i * angle);
        points.push(o);
    }
    return points;
}

export const drawClicks = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.fill();
}

export const drawFigures = (points: Array<Point>, groups: FigureSet, ctx: CanvasRenderingContext2D) => {

    ctx.lineWidth = 2;
    groups.forEach(measure => {

        let subdivision = groups.reduce((a, b) => lcm_two_numbers(a, b), 1);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            if (i % Math.floor(subdivision / measure) === 0) ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();
    });
}

export const getMainGradient = (ctx: CanvasRenderingContext2D, c: Circle) => {
    let gradient = ctx.createRadialGradient(c.x, c.y, 1, c.x, c.y, c.r);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, '#7a8bc19f');
    return gradient;
}

export const animate = (
    animateEvent: ClickEvent,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    centralCircle: Circle
): void => {

    const points = getPoints(animateEvent.groups, centralCircle);

    ctx.clearRect(0, 0, width, height);
    drawMainCircle(ctx, centralCircle);
    drawFigures(points, animateEvent.groups, ctx);
    drawClicks(points[animateEvent.currentNote].x, points[animateEvent.currentNote].y, ctx);

}

