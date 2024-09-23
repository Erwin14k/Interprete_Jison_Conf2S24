import { Expression } from "./Expression";
import { Returnal, Type } from "./Returnal"
import { Error_ } from "../Error/Error_";
import { Ambit } from "../Ambit/Ambit";

export class Arithmetic extends Expression {

    constructor(private left: Expression, private right: Expression, private tipo: ArithmeticType, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito:Ambit): Returnal {
        const leftValue = this.left.execute(ambito);

        const rightValue = this.right.execute(ambito);

        let dominante = this.dominanType(leftValue.type, rightValue.type);

        if (this.tipo == ArithmeticType.SUMA) {
            if (dominante == Type.STRING) {
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING };
            } else if (dominante == Type.NUMBER) {
                return { value: (leftValue.value + rightValue.value), type: Type.NUMBER };
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }
        } else if (this.tipo == ArithmeticType.RESTA) {
            if (dominante == Type.NUMBER) {
                return { value: (leftValue.value - rightValue.value), type: Type.NUMBER };
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }
        }
        else if (this.tipo == ArithmeticType.MULTIPLICACION) {
            if (dominante == Type.NUMBER) {
                return { value: (leftValue.value * rightValue.value), type: Type.NUMBER };
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }
        }
        else if (this.tipo == ArithmeticType.DIVISION) {
            if (dominante == Type.NUMBER) {
                if (rightValue.value == 0) {
                    throw new Error_(this.line, this.column, "Semantico", "No se puede dividir entre 0");
                } else {
                    return { value: (leftValue.value / rightValue.value), type: Type.NUMBER };
                }
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }
        }
    }
}

export enum ArithmeticType {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION
}