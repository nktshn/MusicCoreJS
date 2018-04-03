let resultArray = [];
let exceptionIndexes = [];
let _real, _expected = [];

export default class NoteTester {
    constructor() {
        let _globalTestCounter = 0;
        let _completedTests = 0;
        let _className = "";
        this.constructorTest = (className, methodToTest, constructorParams, expectation) => {
            if (constructorParams instanceof Array && expectation instanceof Array && constructorParams.length === expectation.length) {
                _real = constructorParams;
                _expected = expectation;
                for (let i = 0; i < constructorParams.length; i++) {
                    let currentClass = false;
                    try {
                        debugger;
                        currentClass = this.construct(className, constructorParams[i]);
                        //currentClass = createClass(constructorParams[i]);
                        _className = currentClass.constructor.name;
                        let outputOfMethod = methodToTest(currentClass);
                        if (expectation[i] === outputOfMethod) {
                            resultArray.push("PASSED");
                        } else {
                            resultArray.push("FAILED");
                        }
                    } catch (e) {
                        //console.log(e);
                        exceptionIndexes.push(i);
                        if (!currentClass && expectation[i] === false) {
                            resultArray.push("PASSED");
                        } else {
                            resultArray.push("FAILED");
                        }
                    }
                }
            } else {
                throw new Error("ERROR! Invalid arguments in Tester");
            }
            _completedTests += outputMessage(_className);
            _globalTestCounter++;
        };
        this.showGlobalResult = () => {
            console.log(`[TESTER]: ${_completedTests}/${_globalTestCounter} PASSED`);
        };
        //idk how does it work (-_-)
        this.construct = (constructor, args) => {
            function F() {
                return constructor.apply(this, args);
            }
            F.prototype = constructor.prototype;
            return new F();
        }
    }
}

function outputMessage(className) {
    let longDivider = "--------------------------------------------------------------------------------------";
    let shortDivider = "-----------------------";
    let _completedTests;
    //template:
    let resultMessage = `${longDivider}\n[TESTED CLASS: ${className}]\n${shortDivider}\n`;
    if (resultArray.includes('FAILED') || resultArray.length === 0) {
        resultMessage += ` - [TEST FAILED]\n`;
    } else {
        resultMessage += ` + [TEST PASSED]\n${shortDivider}\n`;
        _completedTests = true;
    }
    resultMessage += `Input data:    ${_real.toString()}\n`;
    resultMessage += `Expected data: ${_expected.toString()}\n`;
    if (resultArray.includes('FAILED')) {
        resultMessage += `[${resultArray.length - getFailedCounter()}/${_real.length} PASSED]\n`;
        resultMessage += `[${resultArray.toString()}]\n`;
    } else {
        //works if 0 test passed
        resultMessage += `[${resultArray.length}/${_real.length} PASSED]\n`;
    }
    if (exceptionIndexes) {
        resultMessage += `[!] Indexes of elements failed with exceptions: ${exceptionIndexes.toString()}\n`;
    }
    resultMessage += `${longDivider}\n`;
    console.log(resultMessage);
    //reset spec fields:
    resultArray = [];
    exceptionIndexes = [];
    _real = [];
    _expected = [];
    //
    return _completedTests ? 1 : 0;
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