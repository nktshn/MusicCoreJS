import {Note} from './src/Entities/Note';
import {Chord} from "./src/Entities/Chord";
import Tester from './testing/Tester';

const tester = new Tester();

//note constructor test:
const noteNames =         [["A#"], ["Gb"], ["E"], ["Bb"], ["A"], ["F#m"], ["G#m"]];
const expectedNoteNames = ["A#", "Gb", "E", "Bb", "A", false, false];
tester.constructorTest(Note, (instance) => instance.getName(), noteNames, expectedNoteNames);

//chord constructor test:
const chordNames =         [["A#"], ["Gb"], ["E"], ["Bb"], ["A#m"], ["Gbm"], ["G#m"], ["F#m"], ["Fm"], ["Em"], ["Bbm"], ["Cb3"]];
const expectedChordNames = ["A#", "Gb", "E", "Bb", "A#m", "Gbm", "G#m", "F#m", "Fm", "Em", "Bbm", false];
tester.constructorTest(Chord, (instance) => instance.getName(), chordNames, expectedChordNames);

//getAltName testes:
tester.methodTest(new Note("Bb"), (instance) => instance.getAltName, [[]], ["A#"], 'getAltName method');
tester.methodTest(new Note("Gb"), (instance) => instance.getAltName, [[]], ["F#"], 'getAltName method');

//usingInChord test
tester.methodTest(new Note("A"), (i) => i.usingInChords, [[]], [['A', 'D', 'F', 'Am', 'Dm', 'F#m']], 'usingInChord');
tester.methodTest(new Note("Bb"), (i) => i.usingInChords, [[]], [['A#', 'D#', 'F#', 'A#m', 'D#m', 'Gm']], 'usingInChord');

//getFunctionInChord test
tester.methodTest(new Note("Bb"), (i) => i.getFunctionInChord, [[new Chord("Bb")]], ['ROOT'], 'getFunctionInChord');
tester.methodTest(new Note("C"), (i) => i.getFunctionInChord, [[new Chord("Am")]], ['THIRD'], 'getFunctionInChord');
tester.methodTest(new Note("Bb"), (i) => i.getFunctionInChord, [[new Chord("D#")]], ['QUINT'], 'getFunctionInChord');
tester.methodTest(new Note("A"), (i) => i.getFunctionInChord, [[new Chord("D#")]], [null], 'getFunctionInChord');

//getNotes Chord test:
tester.methodTest(new Chord("Am"), (i) => i.getNotes, [[]], [['A', 'C', 'E']]);
tester.methodTest(new Chord("A"), (i) => i.getNotes, [[]], [['A', 'C#', 'E']]);

tester.showGlobalResult();



