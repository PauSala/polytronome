import { Tone } from "./tone";

export class CowBellTone extends Tone {


    private osc1!: OscillatorNode;
    private osc2!: OscillatorNode;
    private gainNode!: GainNode;
    private filter!: BiquadFilterNode;

    constructor(ctx: AudioContext) {
        super(ctx);
    }
/**
 * "allpass" | "bandpass" | "highpass" | "highshelf" | "lowpass" | "lowshelf" | "notch" | "peaking"
 */
    protected setup = () => {
        this.osc1 = this.ctx.createOscillator();
        this.osc2 = this.ctx.createOscillator();
        this.osc1.type = "triangle";
        this.osc2.type = "triangle";
        this.osc1.frequency.value = 587;
        this.osc2.frequency.value = 717;
        this.gainNode = this.ctx.createGain();
        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = "lowpass";
        this.osc1.connect(this.gainNode);
        this.osc2.connect(this.gainNode);
        this.gainNode.connect(this.filter)
        this.filter.connect(this.ctx.destination)
    }

    public trigger = (time: number) => {

        this.setup();
        this.gainNode.gain.linearRampToValueAtTime(1, time);
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, time + this.duration);

        this.osc1.start(time);
        this.osc2.start(time);

        this.osc1.stop(time + this.duration);
        this.osc2.stop(time + this.duration);

    };


}