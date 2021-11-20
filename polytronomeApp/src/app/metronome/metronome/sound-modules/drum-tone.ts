import { Tone } from "./tone";

export class DrumTone extends Tone {


    private osc1!: OscillatorNode;
    private osc2!: OscillatorNode;
    private gainNode!: GainNode;
    private filter!: BiquadFilterNode;

    constructor(ctx: AudioContext) {
        super(ctx);
        this.duration = 0.6;
    }

    protected setup = () => {
        this.osc1 = this.ctx.createOscillator();
        this.osc2 = this.ctx.createOscillator();
        this.osc1.type = "triangle";
        this.osc2.type = "triangle";
        this.osc1.frequency.value = 121;
        this.osc2.frequency.value = 171;
        this.gainNode = this.ctx.createGain();
        //this.gainNode.gain.value = 0.0001;
        this.filter = this.ctx.createBiquadFilter();
        
        //"allpass" | "bandpass" | "highpass" | "highshelf" | "lowpass" | "lowshelf" | "notch" | "peaking"
        this.filter.type = "lowpass";
        const compressor = new DynamicsCompressorNode(this.ctx);
        this.osc1.connect(compressor);
        this.osc2.connect(compressor);
        compressor.connect(this.gainNode);
        this.gainNode.connect(this.filter)
        this.filter.connect(this.ctx.destination)
    }

    public trigger = (time: number) => {

        this.setup();
        this.gainNode.gain.linearRampToValueAtTime(0.2, time);
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + this.duration);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, time + this.duration);

        this.osc1.start(time);
        this.osc2.start(time);

        this.osc1.stop(time + this.duration);
        this.osc2.stop(time + this.duration);

    };


}