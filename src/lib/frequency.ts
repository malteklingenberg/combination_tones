import { frequencies_just, frequencies_equal } from "./note_frequencies";

export type NoteName = keyof typeof frequencies_just;
export enum Temperament { just = "just", equal = "equal" };

export function getFrequency(note: NoteName, temperament: Temperament) {
    return temperament === Temperament.just ? frequencies_just[note] : frequencies_equal[note];
}