import { Error_ } from "../Error/Error_";
import { Ambit } from "../Ambit/Ambit";
import { Expression } from "./Expression";
import { Returnal } from "./Returnal";

export class Access extends Expression{
    constructor(private id:string, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambit): Returnal {
        const value = ambito.getVal(this.id)
        if(value != null) return {value:value.value, type:value.type}
        throw new Error_(this.line, this.column, 'Semantico', `No se encuentra la variable ${this.id}`);
    }
}