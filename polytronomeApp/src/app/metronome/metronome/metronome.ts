import { lcm_two_numbers } from "../utils/lcm";
import { animate } from "../metronome-layout/metronome-layout.helpers";
import { Circle, FigureSet } from "../metronome-layout/types";
import { Note } from "./types";
import { EventEmitter } from "@angular/core";


export class Metronome {

    private audioContext: AudioContext;
    private notesInQueue: Array<Note>;
    private currentNote: number;
    private tempo: number;
    private lookahead: number;
    private scheduleAheadTime: number;
    private nextNoteTime: number;
    private isRunning: boolean;
    private intervalID: ReturnType<typeof setTimeout>;
    public groups: FigureSet;
    private width: number;
    private height: number;
    private centerCircle: Circle;
    private ctx: CanvasRenderingContext2D;
    public clickEventEmitter:EventEmitter<boolean>;


    constructor(
        tempo = 100,
        groups = [2],
        width: number,
        height: number,
        centerCircle: Circle,
        ctx: CanvasRenderingContext2D) {

        this.audioContext = new (window.AudioContext)();
        this.notesInQueue = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
        this.currentNote = 0;
        this.tempo = tempo;
        this.lookahead = 25; // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0; // when the next note is due
        this.isRunning = false;
        this.intervalID = setInterval(() => null, 0);
        clearInterval(this.intervalID);
        this.groups = groups.sort((a, b) => a - b);
        this.width = width;
        this.height = height;
        this.centerCircle = centerCircle;
        this.ctx = ctx;
        this.clickEventEmitter = new EventEmitter();

    }

    public startStop() {

        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    private stop() {

        this.isRunning = false;
        clearInterval(this.intervalID);
    }

    private start() {

        if (this.isRunning) return;

        this.isRunning = true;
        this.currentNote = 0;
        //this.nextNoteTime = this.audioContext.currentTime + 0.05;
        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }

    private scheduler() {

        const INITIAL_TIMESTAMP = 0;
        const START = 0;
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {

            if (this.noteInGroup()) {
                this.scheduleNote(this.currentNote, this.nextNoteTime);
                animate(
                    INITIAL_TIMESTAMP,
                    START,
                    this.currentNote,
                    this.groups,
                    this.width,
                    this.height,
                    this.ctx,
                    this.centerCircle
                );
                this.clickEventEmitter.emit(true);
            }
            this.nextNote();
        }
    }

    private noteInGroup() {
        let subdivision = this.groups.reduce((a, b) => lcm_two_numbers(a, b), 1);
        if (this.groups.length === 0) return false;
        if (this.groups.length === 1) return true;
        else {
            return this.groups.reduce((a, b) => a || this.currentNote % Math.floor(subdivision / b) === 0, false)
        }
    }

    private scheduleNote(beatNumber: number, time: number) {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: time, audioContext: this.audioContext.currentTime });
        // create an oscillator
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();

        osc.frequency.value = this.getFrequency(beatNumber, this.groups)
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.03);
    }

    private getFrequency (beatNumber: number, groups: FigureSet){
        if (groups.length > 1) {
            return (beatNumber % Math.max(...this.groups) == 0) ? 1000 : 800;
        } else {
            return beatNumber === 0 ? 1000 : 800;
        }
    }

    private nextNote() {
        // Advance current note 
        var secondsPerBeat = 60.0 / this.tempo / (this.groups.reduce((a, b) => lcm_two_numbers(a, b), 1)) * this.groups.reduce((a, b) => Math.min(a, b))
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

        this.currentNote++; // Advance the beat number, wrap to zeropo
        this.currentNote = this.currentNote % this.groups.reduce((a, b) => lcm_two_numbers(a, b), 1);

    }


}