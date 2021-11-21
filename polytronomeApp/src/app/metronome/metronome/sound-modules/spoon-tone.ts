import { Tone } from "./tone";

export class SpoonTone extends Tone {

    private bufferSource!: AudioBufferSourceNode
    private gainNode!: GainNode;
    private buffer!: AudioBuffer;
    private URL: string;

    constructor(ctx: AudioContext) {
        super(ctx);
        this.duration = 0.5;
        this.URL = '../../../../assets/spoon.mp3';
        this.init();
    }

    private init = async () => {
        try {
            this.buffer = await this.getBuffer();
        } catch (err) {
            throw err;
        }
    }


    private getBuffer = (): Promise<AudioBuffer> => {
        const request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            request.open('GET', this.URL, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                this.ctx.decodeAudioData(
                    request.response,
                    buffer => buffer ? resolve(buffer) : reject('decoding error')
                );
            };
            request.onerror = error => reject(error);
            request.send();
        });
    }

    public trigger = (time: number) => {

        this.bufferSource = this.ctx.createBufferSource();
        this.gainNode = this.ctx.createGain();
        console.log(this.buffer)
        this.bufferSource.buffer = this.buffer;
        this.bufferSource.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.bufferSource.start(time);
        this.bufferSource.stop(time + this.duration)
    };

}