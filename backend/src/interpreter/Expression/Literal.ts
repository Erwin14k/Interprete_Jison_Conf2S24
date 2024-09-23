import { Ambit } from "../Ambit/Ambit";
import { Expression } from "./Expression";
import { Returnal, Type } from './Returnal';
export class Literal extends Expression {

    constructor(private value: any, private type: LiteralType, line: number, column: number) {
        super(line, column);
    }
    public execute(_ambit:Ambit): Returnal{
        if (this.type == 0) {
            return { value: this.value.toString(), type: Type.STRING };
        } else if (this.type == 1) {
            return { value: Number(this.value), type: Type.NUMBER };
        } else if (this.type == 2) {
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Type.BOOLEAN }
            }
            return { value: false, type: Type.BOOLEAN }
        }
    }
}

export enum LiteralType {
    STRING = 0,
    NUMBER = 1,
    BOOL = 2
}