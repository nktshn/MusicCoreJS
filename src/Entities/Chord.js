import * as Theory from '../TheoryData';
import {Note} from "./Note";
import {getKeyByValue} from "../Core";

const LARGE_THIRD = 4;
const SMALL_THIRD = 3;
const QUINT = 7;

class Chord {
    constructor(name) {
        /*
         VALIDATION
         */
        if (!((typeof(name) === "string") && validateChord(name))) {
            throw new Error("ERROR! Invalid chord name");
        }
        /*
         PRIVATE FIELDS
         */
        let _name = name; //name of note
        let _altName = getAltName(_name);
        let _globalIndex = Theory.globalIndexesOfChords[_name];
        /*
         PUBLIC METHODS
         */
        this.getName = () => _name;
        this.getAltName = () => _altName;
        this.getNotes = () => getNotes(_globalIndex);
    }

    /*
     END OF CLASS
     */
}

//checks name of note via RegExp to validate it:
function validateChord(chord) {
    const rgx = new RegExp('(^[A-G]$|^[A-G]m$|^[A,D,G][#,b]$|^[A,D,G][#,b]m$|^[F,C][#]$|^[F,C][#]m$|^[E,B][b]$|^[E,B][b]m$)', 'g');
    return rgx.test(chord);
}

//returns alternative name of note
function getAltName(name) {
    if (Theory.altNamedChords[0].includes(name)) {
        return Theory.altNamedChords[1][Theory.altNamedChords[0].findIndex((elem) => {
            return elem === name;
        })];
    } else {
        if (Theory.altNamedChords[1].includes(name)) {
            return Theory.altNamedChords[0][Theory.altNamedChords[1].findIndex((elem) => {
                return elem === name;
            })];
        } else {
            return name
        }
    }
}

function getNotes(_globalIndex) {
    let notesIndexes = [];
    if (_globalIndex < 12) { //means major chord
        notesIndexes.push(_globalIndex, _globalIndex + LARGE_THIRD, _globalIndex + QUINT); //major schema
    } else { //means minor chord
        notesIndexes.push(_globalIndex - 12, _globalIndex + SMALL_THIRD - 12, _globalIndex + QUINT - 12); //minor schema
    }
    let res = [];
    for (let i = 0; i < notesIndexes.length; i++) {
        if (notesIndexes[i] > 11) {
            notesIndexes[i] -= 12;
        }
        res.push(new Note(getKeyByValue(notesIndexes[i], Theory.globalIndexesOfNotes)).getName());
    }
    return res;
}
export {Chord};
