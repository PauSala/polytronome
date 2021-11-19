export interface ITone {
    trigger: (time: number) => void;
}

export abstract class Tone implements ITone {
    protected ctx: AudioContext;
    protected duration: number;

    constructor(ctx: AudioContext) {
        this.ctx = ctx;
        this.duration = 0.6;
    }
    abstract trigger:(time:number)=>void;
}