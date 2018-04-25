import {Chord} from "./Chord";
class Progression {
    constructor(progression) {
        /*
         VALIDATION
         */
        if (!((progression instanceof Array) && validateProgression(progression))) {
            throw new Error("ERROR! Invalid chord name");
        }
        /*
         PRIVATE FIELDS
         */
        let _progression = progression;
        /*
        PUBLIC FIELDS
         */
        this.getChordsNames = () => {
            let res = [];
            _progression.forEach(e => {
                res.push(e.getName());
            });
            return res;
        }
    }
}

function validateProgression(progression) {
    progression.forEach(e => {
        "use strict";
        if (!(e instanceof Chord)) {
            return false;
        }
    });
    return true;
}

export {Progression}