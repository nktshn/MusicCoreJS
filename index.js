import {Note} from './src/Entities/Note';
import {Chord} from "./src/Entities/Chord";
import Tester from './testing/NoteTester';

let noteNames =         ["A#", "Gb", "E", "Bb", "A", "F#m", "A#m"];
let expectedNoteNames = ["A#", "Gb", "E", "Bb", "A", false, false];
let chordNames =         ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", "C"];
let expectedChordNames = ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bm", "C"];

let tester = new Tester();
tester.constructorTest(Note, noteNames, "getName", expectedNoteNames);
tester.constructorTest(Chord, chordNames, "getName", expectedChordNames);


