export class Calculatrice {
  private lastOperator: string | null = null;
  input: string = "";
  output: string = "";
  private setOutput: React.Dispatch<React.SetStateAction<string>>;
  private setLastOperator: React.Dispatch<React.SetStateAction<string | null>>;

  constructor(
    [output, setOutput]: [string, React.Dispatch<React.SetStateAction<string>>],
    [lastOperator, setLastOperator]: [
      string | null,
      React.Dispatch<React.SetStateAction<string | null>>
    ]
  ) {
    this.output = output;
    this.lastOperator = lastOperator;
    this.setOutput = setOutput;
    this.setLastOperator = setLastOperator;
  }

  updateInput(value: string | number) {
    console.log("Updating input with value:", value);
    if (this.preventDualOperators(value)) return;

    if (typeof value === "string" && this.switchSign(value)) return;

    this.output += value;
    this.setOutput(this.output);
  }

  calculate() {
    if (this.output.trim() === "") {
      this.showAlert("Error: Empty Expression");
      return;
    }
    try {
      const result = eval(this.output);
      this.output = result.toString();
      this.setOutput(this.output);
    } catch (error) {
      this.showAlert("Error: Invalid Expression");
    }
  }

  deleteLast() {
    this.output = this.output.slice(0, -1);
    this.setOutput(this.output);
  }

  deleteAll() {
    this.output = "";
    this.setOutput(this.output);
  }

  showAlert(alert: string) {
    this.output = "";
    this.setOutput(alert);
  }

  preventDualOperators(value: string | number): boolean {
    const newOperator =
      typeof value === "string" && ["+", "-", "*", "/"].includes(value)
        ? value
        : null;
    this.setLastOperator(newOperator);
    if (newOperator && this.lastOperator) {
      this.output = this.output.slice(0, -1) + newOperator;
      this.setOutput(this.output);
      return true;
    }
    return false;
  }

  switchSign(value: string): boolean {
    if (value === "+/-") {
      const tokens = this.output.split(/([\+\-\*\/])/);
      const lastToken = tokens[tokens.length - 1];
      if (lastToken) {
        if (lastToken.startsWith("-")) {
          tokens[tokens.length - 1] = lastToken.slice(1);
        } else {
          tokens[tokens.length - 1] = "-" + lastToken;
        }
        this.output = tokens.join("");
        this.setOutput(this.output);
      }
      return true;
    }
    return false;
  }
}
