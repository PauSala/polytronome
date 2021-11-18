import { lcm_two_numbers } from "./lcm";
import { Circle, Group, Point } from "./types";

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




// export const drawBackgroundCircle = (ctx: CanvasRenderingContext2D, c: Circle): void => {
//     ctx.beginPath();
//     ctx.arc(c.x, c.y, c.r + 10, 0, 2 * Math.PI);
//     ctx.strokeStyle = '#f3a625cf';
//     ctx.stroke();
//     ctx.fillStyle = '#f3a625cf';
//     ctx.fill();
// }

export const getPoints = (groups: Group, c: Circle) => {

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

export const getOuterPoints = (group: number, c: Circle) => {
    let angle = (2 * Math.PI) / group;
    let outerRadius = c.r * 0.95;
    let points = [];
    for (let i = 0; i > -group; i--) {
        let o: Point = { x: 0, y: 0 };
        o.x = c.x + outerRadius * Math.sin(i * angle - (2 * Math.PI) / group / 2);
        o.y = c.y + outerRadius * Math.cos(i * angle - (2 * Math.PI) / group / 2);
        points.push(o);
    }
    return points;
}

export const drawClicks = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.fill();
}

export const drawFigures = (points: Array<Point>, groups: Group, ctx: CanvasRenderingContext2D) => {

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

export const animate =
    (
        timestamp: number,
        start: number,
        currentNote: number,
        groups: Group,
        width: number,
        height:number,
        ctx: CanvasRenderingContext2D,
        centralCircle: Circle
    ): void => {

        if (!start) start = timestamp;

        const points = getPoints(groups, centralCircle);

        ctx.clearRect(0, 0, width, height);
        drawMainCircle(ctx, centralCircle);
        drawFigures(points, groups, ctx);
        drawClicks(points[currentNote].x, points[currentNote].y, ctx);

    }

