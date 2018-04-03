import {Note} from './src/Entities/Note';
import {Chord} from "./src/Entities/Chord";
import Tester from './testing/NoteTester';

const tester = new Tester();

const noteNames =         [["A#"], ["Gb"], ["E"], ["Bb"], ["A"], ["F#m"], ["G#m"]];
const expectedNoteNames = ["A#", "Gb", "E", "Bb", "A", false, false];
tester.constructorTest(Note, (i) => i.getName(), noteNames, expectedNoteNames);

const chordNames =         [["A#"], ["Gb"], ["E"], ["Bb"], ["A#m"], ["Gbm"], ["G#m"], ["F#m"], ["Fm"], ["Em"], ["Bbm"], ["Cb3"]];
const expectedChordNames = ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", false];
tester.constructorTest(Chord, (i) => i.getName(), chordNames, expectedChordNames);

export class Kek {
    constructor(a1, a2) {
        if (!(a1 instanceof String && a2 instanceof String)) {
            throw new Error("ERROR KEK");
        }
        this.getAll = () => `${a1} ${a2}!`;
    }
}

tester.constructorTest(Kek, (i) => i.getAll(), [["Hi", "Buy"], ["Day", "May"]], ["Hi Buy!", "Day May!"]);
tester.showGlobalResult();



