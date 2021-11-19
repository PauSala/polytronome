import { lcm_two_numbers } from "../utils/lcm";
import { Figure, FigureSet } from "../metronome-layout/types";
import { ClickEvent, Note } from "./types";
import { EventEmitter } from "@angular/core";
import { CowBellTone } from "./sound-modules/cowbell-tone";
import { MetronomeTone } from "./sound-modules/metronome-tone";


export class Metronome {

    private audioContext: AudioContext;
    private notesInQueue: Array<Note>;
    private currentNote: number;
    private lookahead: number;
    private scheduleAheadTime: number;
    private nextNoteTime: number;
    private isRunning: boolean;
    private intervalID!: ReturnType<typeof setTimeout>;
    public tempo: number;
    public groups: FigureSet;
    public clickEventEmitter: EventEmitter<ClickEvent>;
    private cowBellTone:CowBellTone;
    private metronomeTone:MetronomeTone;


    constructor(tempo: number, groups: FigureSet) {

        this.audioContext = new (window.AudioContext)();
        this.notesInQueue = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
        this.currentNote = 0;
        this.tempo = tempo;
        this.lookahead = 25; // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0; // when the next note is due
        this.isRunning = false;
        this.groups = groups.sort((a, b) => a - b);
        this.clickEventEmitter = new EventEmitter();
        this.cowBellTone = new CowBellTone(this.audioContext);
        this.metronomeTone = new MetronomeTone(this.audioContext);

    }

    public addFigure(figure: Figure) {
        if (!this.groups.includes(figure)) {
            this.groups.push(figure);
        }
    }

    public increaseTempo() { this.tempo++ }

    public decreaseTempo() { this.tempo-- }

    public removeFigure(figure: Figure) {
        this.groups = this.groups.filter((_figure: Figure) => _figure !== figure);
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

        const INITIAL_DELAY = 0.05;

        if (this.isRunning) return;

        this.isRunning = true;
        this.currentNote = 0;
        this.nextNoteTime = this.audioContext.currentTime + INITIAL_DELAY;
        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }

    private scheduler() {

        if (this.groups.length === 0) return;

        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {

            if (this.noteInGroup()) {

                this.scheduleNote(this.currentNote, this.nextNoteTime);

                const clickEvent: ClickEvent = {
                    currentNote: this.currentNote,
                    groups: this.groups,
                }
                this.clickEventEmitter.emit(clickEvent);
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

        this.cowBellTone.trigger(time);
        //this.metronomeTone.trigger(time);
    }

    private nextNote() {
        // Advance current note 
        var secondsPerBeat = 60.0 / this.tempo / (this.groups.reduce((a, b) => lcm_two_numbers(a, b), 1)) * this.groups.reduce((a, b) => Math.min(a, b))
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

        this.currentNote++; // Advance the beat number
        this.currentNote = this.currentNote % this.groups.reduce((a, b) => lcm_two_numbers(a, b), 1);

    }


}