import { Tone } from "./tone";

export class MetronomeTone2 extends Tone {

    constructor(ctx: AudioContext) {
        super(ctx);        
    }

    public trigger = (time: number) => {

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        const compressor = new DynamicsCompressorNode(this.ctx, {attack:1});

        osc.frequency.value = 400;
        gainNode.gain.value = 1;
        gainNode.gain.exponentialRampToValueAtTime(1, time + 0.001);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(gainNode);
        gainNode.connect(compressor)
        compressor.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.03);

    }

}
