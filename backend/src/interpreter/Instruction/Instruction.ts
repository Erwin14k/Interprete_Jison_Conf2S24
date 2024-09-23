import { Ambit } from "../Ambit/Ambit";

export abstract class Instruction {
    public line: number;
    public column: number;
    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    public abstract execute(ambito:Ambit):any;
}