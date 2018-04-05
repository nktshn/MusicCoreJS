let resultArray = [];
let exceptionIndexes = [];
let _real, _expected = [];

export default class Tester {
    constructor() {
        let _globalTestCounter = 0;
        let _completedTests = 0;
        let _className = "";
        this.constructorTest = (className, methodToTest, constructorParams, expectation, msg) => {
            if (constructorParams instanceof Array && expectation instanceof Array && constructorParams.length === expectation.length) {
                _real = constructorParams;
                _expected = expectation;
                for (let i = 0; i < constructorParams.length; i++) {
                    let currentClass = false;
                    try {
                        currentClass = this.constructInstance(className, constructorParams[i]);
                        _className = currentClass.constructor.name;
                        let outputOfMethod = methodToTest(currentClass);
                        if (expectation[i] === outputOfMethod) {
                            resultArray.push("PASSED");
                        } else {
                            resultArray.push("FAILED");
                        }
                    } catch (e) {
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
            _completedTests += outputMessage(`Class: ${_className}`, msg);
            _globalTestCounter++;
        };
        //tester for methods:
        this.methodTest = (instance, method, inputParams, expected, msg) => {
            if (inputParams instanceof Array && expected instanceof Array && typeof (method) === 'function') {
                _real = inputParams;
                _expected = expected;
                let output = false;
                for (let i = 0; i < inputParams.length; i++) {
                    try {
                        output = this.constructMethod(method(instance), inputParams[i]);
                        if (JSON.stringify(expected[i]) === JSON.stringify(output)) {
                            resultArray.push("PASSED");
                        } else {
                            resultArray.push("FAILED");
                        }
                    } catch (e) {
                        console.log(e);
                        exceptionIndexes.push(i);
                        if (!output && expected[i] === false) {
                            resultArray.push("PASSED");
                        } else {
                            resultArray.push("FAILED");
                        }
                    }
                }
            } else {
                throw new Error("ERROR! Invalid arguments in Tester");
            }
            _completedTests += outputMessage(`Method of ${instance.constructor.name}`, msg);
            _globalTestCounter++;
        };
        /*
         ADDITIONAL FUNCTIONS
         */
        this.showGlobalResult = () => {
            console.log(`[TESTER] GLOBAL RESULT: ${_completedTests}/${_globalTestCounter} PASSED`);
        };
        //idk how does it work (-_-)
        this.constructInstance = (constructor, args) => {
            function F() {
                return constructor.apply(this, args);
            }

            F.prototype = constructor.prototype;
            return new F();
        };
        //makes method to pass any number of args
        this.constructMethod = (f, args) => {
            return f.apply(null, args);
        }
    }
}

function outputMessage(className, msg) {
    let longDivider = "--------------------------------------------------------------------------------------";
    let shortDivider = "-----------------------";
    let _completedTests;
    //template:
    let resultMessage = `${longDivider}\n[TESTED] ${className}\n[Message]: ${msg || 'none'}\n${shortDivider}\n`;
    if (resultArray.includes('FAILED') || resultArray.length === 0) {
        resultMessage += ` - [TEST FAILED]\n`;
    } else {
        resultMessage += ` + [TEST PASSED]\n${shortDivider}\n`;
        _completedTests = true;
    }
    resultMessage += `Input data:    ${_real.toString() || 'none'} \n`;
    resultMessage += `Expected data: ${_expected.toString()}\n`;
    if (resultArray.includes('FAILED')) {
        resultMessage += `[${resultArray.length - getFailedCounter()}/${_real.length} PASSED]\n`;
        resultMessage += `[${resultArray.toString()}]\n`;
    } else {
        //works if 0 test passed
        resultMessage += `[${resultArray.length}/${_real.length} PASSED]\n`;
    }
    if (exceptionIndexes.length > 0) {
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