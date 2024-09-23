import { Expression } from "../Expression/Expression";
import { Ambit } from "../Ambit/Ambit";
import { Instruction } from "./Instruction";
import { addNewInformation } from "../../output/Global";
export class Print extends Instruction{
    constructor(private values:Expression[],line:any, column:any ){
        super(line, column)
    }

    public execute(ambito: Ambit) {
        for (const value of this.values) {
            const val = value.execute(ambito)
            console.log(val?.value);
            addNewInformation(val.value+"\n");
        }
    }
}