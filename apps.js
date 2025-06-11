// ==== MODEL ====
class CalculatorModel {
    constructor() {
      this.reset();
    }
    reset() {
      this.currentValue = '0';
      this.operator = null;
      this.operand = null;
      this.waitingForOperand = false;
    }
    inputNumber(num) {
      if (this.waitingForOperand) {
        this.currentValue = num === '.' ? '0.' : num;
        this.waitingForOperand = false;
      } else {
        if (num === '.' && this.currentValue.includes('.')) return;
        if (this.currentValue === '0' && num !== '.') {
          this.currentValue = num;
        } else {
          this.currentValue += num;
        }
      }
    }
    setOperator(op) {
      if (this.operator && !this.waitingForOperand) {
        this.calculate();
      }
      this.operator = op;
      this.operand = parseFloat(this.currentValue);
      this.waitingForOperand = true;
    }
    calculate() {
      if (this.operator && this.operand !== null) {
        let result = 0;
        let curr = parseFloat(this.currentValue);
        switch (this.operator) {
          case '+': result = this.operand + curr; break;
          case '-': result = this.operand - curr; break;
          case '*': result = this.operand * curr; break;
          case '/': result = curr === 0 ? 'Error' : this.operand / curr; break;
        }
        this.currentValue = String(result);
        this.operator = null;
        this.operand = null;
        this.waitingForOperand = false;
      }
    }
    getDisplay() {
      return this.currentValue;
    }
  }
  
  // ==== VIEW ====
  class CalculatorView {
    constructor(displayElement) {
      this.displayElement = displayElement;
    }
    updateDisplay(value) {
      this.displayElement.textContent = value;
    }
  }
  
  // ==== CONTROLLER ====
  class CalculatorController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.attachEvents();
      this.view.updateDisplay(this.model.getDisplay());
    }
    attachEvents() {
      document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => this.handleButton(e.target));
      });
    }
    handleButton(button) {
      if (button.hasAttribute('data-number')) {
        this.model.inputNumber(button.getAttribute('data-number'));
        this.view.updateDisplay(this.model.getDisplay());
      } else if (button.hasAttribute('data-action')) {
        const action = button.getAttribute('data-action');
        if (action === 'clear') {
          this.model.reset();
          this.view.updateDisplay(this.model.getDisplay());
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
          const ops = { add: '+', subtract: '-', multiply: '*', divide: '/' };
          this.model.setOperator(ops[action]);
        } else if (action === 'equals') {
          this.model.calculate();
          this.view.updateDisplay(this.model.getDisplay());
        }
      }
    }
  }
  
  // ==== APP INIT ====
  window.onload = function() {
    const model = new CalculatorModel();
    const view = new CalculatorView(document.getElementById('display'));
    new CalculatorController(model, view);
  };