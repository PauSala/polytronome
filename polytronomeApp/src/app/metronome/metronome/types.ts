import { Circle, FigureSet } from "../metronome-layout/types";

export type Note = { note: number; time: number; audioContext: number };
export type ClickEvent = { 
    currentNote: number,
    groups: FigureSet,
}