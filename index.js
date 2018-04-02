import {Note} from './src/Entities/Note';
import {Chord} from "./src/Entities/Chord";
import Tester from './testing/NoteTester';

let noteNames =         ["A#", "Gb", "E", "Bb", "A", "F#m", "G#m"];
let expectedNoteNames = ["A#", "Gb", "E", "Bb", "A", false, false];
let chordNames =         ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", "Cb3"];
let expectedChordNames = ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", "C"];

let tester = new Tester();
tester.constructorTest("Note", (i) => i.getName(), noteNames, expectedNoteNames);
tester.constructorTest("Chord", (i) => i.getName(), chordNames, expectedChordNames);
tester.showGlobalResult();


