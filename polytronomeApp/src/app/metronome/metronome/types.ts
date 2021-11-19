import { FigureSet } from "../metronome-layout/types";
import { Tone } from "./sound-modules/tone";

export type Note = { note: number; time: number; audioContext: number };
export type ClickEvent = { 
    currentNote: number,
    groups: FigureSet,
}

export type FigureConfiguration = {
    tone:Tone;
    displacement:number;
}
export type FigureConfigurationMap = Map<number, FigureConfiguration>
