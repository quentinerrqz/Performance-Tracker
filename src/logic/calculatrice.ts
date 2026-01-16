import { formatedOperators } from "./affichage";
import { operators } from "./constantes";

export class Calculatrice {
  private lastOperator: string | null = null;
  private setLastOperator: React.Dispatch<React.SetStateAction<string | null>>;
  input: string = "0";

  private setOutput: React.Dispatch<React.SetStateAction<string>>;

  constructor(
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLastOperator: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    this.setOutput = setOutput;
    this.setLastOperator = setLastOperator;
  }

  private formatInput(input: string): string {
    let inputFormatted = input;
    for (const i in formatedOperators) {
      inputFormatted = inputFormatted.replace(
        new RegExp(`\\${i}`, "g"),
        formatedOperators[i as keyof typeof formatedOperators]
      );
    }
    return inputFormatted;
  }

  updateInput(value: string | number) {
    const tokens = this.input.split(/([\+\-\*\/\%])/);
    const lastToken = tokens[tokens.length - 1];
    if (value === "." && (lastToken.includes(".") || lastToken === "")) {
      return;
    }
    if (
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value as number) &&
      lastToken === "0"
    ) {
      this.input = this.input.slice(0, -1) + value.toString();
      this.setOutput(this.formatInput(this.input));
      return;
    }

    if (operators.includes(value as string)) {
      if (this.preventDualOperators(value as string)) return;
    } else {
      this.lastOperator = null;
      this.setLastOperator(this.lastOperator);
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value as number)) {
      }
    }

    if (value === "+/-" && this.switchSign()) return;

    this.input += value;
    this.setOutput(this.formatInput(this.input));
  }

  calculate() {
    if (this.input.trim() === "") {
      this.showAlert("Error: Empty Expression");
      return;
    }
    try {
      const result = eval(this.input);
      this.input = result.toString();
      this.setOutput(this.formatInput(this.input));
    } catch (error) {
      this.showAlert("Error: Invalid Expression");
    }
  }

  deleteLast() {
    if (this.input.length <= 1) {
      this.deleteAll();
      return;
    }

    this.input = this.input.slice(0, -1);
    this.setOutput(this.formatInput(this.input));
    if (operators.includes(this.input.slice(-1))) {
      if (
        this.input.slice(-1) === "-" &&
        operators.includes(this.input[this.input.length - 2])
      ) {
        this.lastOperator = this.input[this.input.length - 2];
        this.input = this.input.slice(0, -1);
        this.setOutput(this.formatInput(this.input));
      }
      this.lastOperator = this.input.slice(-1);
      this.setLastOperator(this.lastOperator);
    } else {
      this.lastOperator = null;
      this.setLastOperator(this.lastOperator);
    }
  }

  deleteAll() {
    this.input = "0";
    this.setOutput("0");
    this.lastOperator = null;
    this.setLastOperator(this.lastOperator);
  }

  showAlert(alert: string) {
    this.setOutput(alert);
  }

  preventDualOperators(newOperator: string): boolean {
    if (this.lastOperator === null) {
      this.lastOperator = newOperator;
      this.setLastOperator(newOperator);
      return false;
    } else if (newOperator !== this.lastOperator) {
      this.input = this.input.slice(0, -1) + newOperator;
      this.setOutput(this.formatInput(this.input));
      this.lastOperator = newOperator;
      this.setLastOperator(newOperator);
      return true;
    }
    return true;
  }

  switchSign(): true {
    const tokens = this.input.split(/([\+\-\*\/\%])/);
    const lastToken = tokens[tokens.length - 1];
    const previousToken = tokens.length > 1 ? tokens[tokens.length - 2] : null;

    if (lastToken !== "") {
      if (previousToken === "-") {
        if (tokens[tokens.length - 3] === "") {
          tokens.splice(tokens.length - 2, 1);
        } else {
          tokens[tokens.length - 2] = "+";
        }
      } else if (previousToken === "+") {
        tokens[tokens.length - 2] = "-";
      } else if (operators.includes(previousToken as string)) {
        tokens[tokens.length - 1] = "-" + lastToken;
      } else if (previousToken === null) {
        tokens[tokens.length - 1] = "-" + lastToken;
      }
    } else {
      if (operators.includes(previousToken as string)) {
        if (previousToken === "-") {
          tokens[tokens.length - 2] = "+1";
        } else if (previousToken === "+") {
          tokens[tokens.length - 2] = "-1";
        } else {
          tokens.push("-1");
        }
      }
    }
    this.input = tokens.join("");
    this.setOutput(this.formatInput(this.input));
    return true;
  }
}
