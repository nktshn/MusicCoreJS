import {Note} from './src/Entities/Note';
import {Chord} from "./src/Entities/Chord";
import Tester from './testing/NoteTester';

let noteNames =         ["A#", "Gb", "E", "Bb", "A", "F#m", "G#m"];
let expectedNoteNames = ["A#", "Gb", "E", "Bb", "A", false, false];
let chordNames =         ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", "Cb3"];
let expectedChordNames = ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", false];

let tester = new Tester();
tester.constructorTest((arg) => new Note(arg), (i) => i.getName(), noteNames, expectedNoteNames);
tester.constructorTest((arg) => new Chord(arg), (i) => i.getName(), chordNames, expectedChordNames);
tester.showGlobalResult();

// let note = new Note("Bb");
// note.swapToAltName();
// console.log(note.getName());

