import { Ambit } from "../Ambit/Ambit";
import { types, Type, Returnal } from "./Returnal"

export abstract class Expression {
    public line: number;
    public column: number;
    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    public abstract execute(ambit:Ambit): Returnal;


    public dominanType(type1: Type, type2: Type): Type {
        return types[type1][type2];
    }
}