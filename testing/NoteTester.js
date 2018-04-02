import {Note} from "../src/Entities/Note";
import {Chord} from "../src/Entities/Chord";

let resultArray = [];
let exceptionIndexes = [];
let _real, _expected = [];

export default class NoteTester {
    constructor() {
        this.constructorTest = (className, methodToTest, constructorParams, expectation) => {
            if (constructorParams instanceof Array && expectation instanceof Array && constructorParams.length === expectation.length) {
                _real = constructorParams;
                _expected = expectation;
                for (let i = 0; i < constructorParams.length; i++) {
                    let currentClass = false;
                    try {
                        currentClass = new testClassesList[className](constructorParams[i]);
                        let currentMethod = testMethodsList[methodToTest];
                        let outputOfMethod = currentMethod(currentClass);
                        if (expectation[i] === outputOfMethod) {
                            resultArray.push("PASSED");
                        } else {
                            resultArray.push("FAILED");
                        }
                    } catch (e) {
                        exceptionIndexes.push(i);
                    }
                    finally {
                        if (!currentClass) {
                            resultArray.push("PASSED");
                        }
                    }
                }
            } else {
                throw new Error("ERROR! Invalid arguments in Tester");
            }
            outputMessage("");
        }
    }
}

const
    testMethodsList = {
        'getName': (instance) => {
            return instance.getName();
        }
    };

const testClassesList = {
    "Note": Note,
    "Chord": Chord
};

function

outputMessage(className) {
    let longDivider = "--------------------------------------------------------------------------------------";
    let shortDivider = "-----------------------";
    //template:
    let resultMessage = `${longDivider}\n[TESTED CLASS: ${className}]\n${shortDivider}\n`;
    resultMessage += resultArray.includes('FAILED') ? ` - [TEST FAILED]\n` : ` + [TEST PASSED]\n${shortDivider}\n`;
    resultMessage += `Input data:    ${_real.toString()}\n`;
    resultMessage += `Expected data: ${_expected.toString()}\n`;
    if (resultArray.includes('FAILED')) {
        resultMessage += `[${resultArray.length - getFailedCounter()}/${resultArray.length} PASSED]\n`;
        resultMessage += `[${resultArray.toString()}]\n`;
    } else {
        resultMessage += `[${resultArray.length}/${resultArray.length} PASSED]\n`;
    }
    if (exceptionIndexes) {
        resultMessage += `[!] Indexes of elements failed with exceptions: ${exceptionIndexes.toString()}\n`;
    }
    resultMessage += `${longDivider}\n`;
    console.log(resultMessage);
}

//finds number of failed tests:
function getFailedCounter() {
    let counter = 0;
    resultArray.forEach(elem => {
        if (elem === 'FAILED') {
            counter++;
        }
    });
    return counter;
}