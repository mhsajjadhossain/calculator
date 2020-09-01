class Calculator {
    constructor(prevOperationTextElem, currentTextElem) {
        this.prevOperationTextElem = prevOperationTextElem;
        this.currentTextElem = currentTextElem;
        this.clear();
    }

    clear() {
        this.currentOparetion = ''
        this.prevOperation = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOparetion = this.currentOparetion.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOparetion.includes('.')) return;
        this.currentOparetion = this.currentOparetion.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOparetion === '') return;
        if (this.prevOperation !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperation = this.currentOparetion;
        this.currentOparetion = '';
    }
    compute() {
        let computation;
        let prev = parseFloat(this.prevOperation);
        let current = parseFloat(this.currentOparetion);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '/':
                computation = prev / current;
                break
            default:
                return
        }
        this.currentOparetion = computation;
        this.operation = undefined;
        this.prevOperation = ''
    }
    getDisplay(number) {
        let stiringNum = number.toString();
        let intgerNumb = parseFloat(stiringNum.split('.')[0]);
        let decimalDigit = stiringNum.split('.')[1]
        let intigerDisplay;

        if (isNaN(intgerNumb)) {
            intigerDisplay = '';
        } else {
            intigerDisplay = intgerNumb.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigit != null) {
            return `${intigerDisplay}.${decimalDigit}`
        } else {
            return intigerDisplay;
        }
    }
    updateDisplay() {
        this.currentTextElem.innerText = this.getDisplay(this.currentOparetion);
        if (this.operation != null) {
            this.prevOperationTextElem.innerText = `${this.getDisplay(this.prevOperation)} ${this.operation}`
        } else {
            this.prevOperationTextElem.innerText = '';
        }
    }

    NumberWithKeyboard(keyvalue){
        numberButtons.forEach(button=>{
            if(button.innerText === keyvalue){
                button.click();
            }
        })
    }
    operationWithKeyboard(keyvalue){
        operationButtons.forEach(button=>{
            if(button.innerText === keyvalue){
                button.click();
            }
        })
    }
    equelClearAndDel(keyvalue){
        switch(keyvalue){
            case 13:
                equelButtons.click();
            break;
            case 8:
                deleteButtons.click();
            break;
            case 144:
                allClearButtons.click();
            break;
        }
    }
    
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equelButtons = document.querySelector('[data-equel]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-clear-all]')
const prevOperationTextElem = document.querySelector('[data-previous-oparetion]')
const currentTextElem = document.querySelector('[data-current-oparetion]')


let calculator = new Calculator(prevOperationTextElem, currentTextElem);


// get numbers button action
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// oparetion button action
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
// equel action
equelButtons.addEventListener('click', (e) => {
    calculator.compute();
    calculator.updateDisplay();
    e.preventDefault()
})
// clear action
allClearButtons.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})
// delete action
deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


document.addEventListener('keyup', e=>{
    calculator.NumberWithKeyboard(e.key)
    calculator.operationWithKeyboard(e.key)
    calculator.equelClearAndDel(e.which)

    console.log(e.key);
})