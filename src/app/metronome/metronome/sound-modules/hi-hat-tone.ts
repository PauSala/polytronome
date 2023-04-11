import { Tone } from "./tone";

export class HiHatTone extends Tone {

    private ratios: Array<number>;
    private oscilators!: OscillatorNode[];
    private gainNode!: GainNode;
    private filter!: BiquadFilterNode;

    constructor(ctx: AudioContext) {
        super(ctx);
        //Not performant :( =>  this.ratios = [40, 2, 3, 4.16, 5.43, 6.79, 8.21];
        this.ratios = [ 2, 4.16, 5.43, 8.21];

    }

    private setup = (time: number) => {
        this.gainNode = this.ctx.createGain();
        // Highpass
        const highpass = this.ctx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 7000;

        // Connect the graph
        highpass.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        const fundamental = 40;
        this.oscilators = this.ratios.map(ratio => {
            const osc = this.ctx.createOscillator();
            const compressor = new DynamicsCompressorNode(this.ctx);
            osc.type = "square";
            osc.frequency.value = fundamental * ratio;
            osc.connect(compressor);
            compressor.connect(highpass);
            osc.start(time);
            osc.stop(time + 0.3);
            return osc;
        });

        this.gainNode.gain.setValueAtTime(0.00001, time);
        this.gainNode.gain.exponentialRampToValueAtTime(1, time + 0.02);
        this.gainNode.gain.exponentialRampToValueAtTime(0.3, time + 0.03);
        this.gainNode.gain.exponentialRampToValueAtTime(0.00001, time + 0.3);

    }

    public trigger = (time: number) => {
        this.setup(time);
    }

}