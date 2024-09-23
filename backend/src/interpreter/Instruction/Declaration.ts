import { Expression } from "../Expression/Expression";
import { Ambit } from "../Ambit/Ambit";
import { Instruction } from "./Instruction";

export class Declaration extends Instruction{
    constructor(private id:string, private value:Expression, line:any, column:any){
        super(line, column)
    }

    public execute(ambit: Ambit) {
        const val = this.value.execute(ambit)
        ambit.setVal(this.id, val.value, val.type, this.line, this.column)
    }
}