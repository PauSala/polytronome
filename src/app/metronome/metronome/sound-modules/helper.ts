import { FigureSet } from "../../metronome-layout/types";

export const getFrequency = (beatNumber: number, groups: FigureSet) => {
    if (groups.length > 1) {
        return (beatNumber % Math.max(...groups) == 0) ? 1000 : 800;
    } else {
        return beatNumber === 0 ? 1000 : 800;
    }
}