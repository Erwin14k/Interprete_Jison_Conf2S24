import { Error_ } from "../Error/Error_";
import { Expression } from "../Expression/Expression";
import { Ambit } from "../Ambit/Ambit";
import { Instruction } from "./Instruction";

export class LlamadaFuncion extends Instruction{
    constructor(private id:string, private params: Array<Expression>, line:number, column:number){
        super(line, column)
    }
    public execute(ambito: Ambit) {
        const func = ambito.getFuncion(this.id)
        if(func){
            if(this.params.length === func.paramsIDs.length){
                const newAmbito = new Ambit(ambito,"Function_"+this.id)
                ambito.agregarSubAmbito(newAmbito); 
                for (const i in this.params) {
                    const value = this.params[i].execute(newAmbito)
                    newAmbito.setVal(func.paramsIDs[i], value.value, value.type, this.line, this.column)
                }
                func.statement.execute(newAmbito)
            }else{
                throw new Error_(this.line, this.column, 'Semantico', `Cantidad de parametros incorrecta`)
            }
        }else{
            throw new Error_(this.line, this.column, 'Semantico', `Funcion ${this.id} no encontrada`)
        }
    }
}