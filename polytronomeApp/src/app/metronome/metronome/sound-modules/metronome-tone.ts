import { Tone } from "./tone";

export class MetronomeTone extends Tone {

    constructor(ctx: AudioContext) {
        super(ctx);        
    }

    public trigger = (time: number) => {

        const osc = this.ctx.createOscillator();
        const envelope = this.ctx.createGain();

        osc.frequency.value = 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.03);

    }

}
