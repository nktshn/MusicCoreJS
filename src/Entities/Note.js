import * as Theory from '../TheoryData';
import {Chord} from './Chord';

class Note {
    constructor(name) {
        /*
         VALIDATION
         */
        if (!((typeof(name) === "string") && validateNote(name))) {
            throw new Error("ERROR! Invalid note name");
        }
        /*
         PRIVATE FIELDS
         */
        let _name = name; //name of note
        let _altName = getAltName(_name);
        let _globalIndex = Theory.globalIndexesOfNotes[_name];
        /*
         PUBLIC METHODS
         */
        this.getName = () => _name;
        this.getAltName = () => _altName;
        this.swapToAltName = () => {
            let t = _name;
            _name = _altName;
            _altName = t;
        };
        this.usingInChords = () => getChordsWhereNoteUses(_name);
        this.getFunctionInChord = chord => {
            if (!(chord instanceof Chord)) {
                throw new Error("ERROR! Invalid chord object");
            }
            let notes = chord.getNotes();
            for (let i = 0; i < notes.length; i++) {
                if (_name === notes[i].getName()) {
                    return Theory.notesFunctionsInChord[i];
                }
            }
            return null;
        }
        /*
         END OF CLASS
         */
    }
}

//checks name of note via RegExp to validate it:
function validateNote(note) {
    const rgx = new RegExp('(^[A-G]$|^[A,D,G][#,b]$|^[F,C][#]$|^[E,B][b]$)', 'g');
    return rgx.test(note);
}

//returns alternative name of note
function getAltName(name) {
    if (Theory.altNamedNotes[0].includes(name)) {
        return Theory.altNamedNotes[1][Theory.altNamedNotes[0].findIndex((elem) => {
            return elem === name;
        })];
    } else {
        if (Theory.altNamedNotes[1].includes(name)) {
            return Theory.altNamedNotes[0][Theory.altNamedNotes[1].findIndex((elem) => {
                return elem === name;
            })];
        } else {
            return name
        }
    }
}

//returns array of chords that contains the note
function getChordsWhereNoteUses(_name) {
    let usesChords = [];
    for (let val in Theory.globalIndexesOfChords) {
        if (Theory.globalIndexesOfChords.hasOwnProperty(val)) {
            let chord = new Chord(val);
            let notes = chord.getNotes();
            notes.forEach(elem => {
                if (elem.getName() === _name) {
                    usesChords.push(chord);
                }
            })
        }
    }
    return usesChords;
}

export {Note};

