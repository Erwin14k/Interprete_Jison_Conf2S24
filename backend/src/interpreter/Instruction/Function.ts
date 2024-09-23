import { Ambit } from "../Ambit/Ambit";
import { Instruction } from "./Instruction";
import { Statement } from "./Statement";

export class Function extends Instruction{
    constructor(public id: string, public statement:Statement, public paramsIDs:Array<string>, line:number, column:number){
        super(line, column)
    }

    public execute(ambit: Ambit) {
        ambit.guardarFuncion(this.id, this)
    }
}