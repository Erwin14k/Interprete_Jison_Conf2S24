import { Type } from "../Expression/Returnal";
import { Symbol } from "./Symbol";
import { Error_ } from "../Error/Error_";
import { Function } from "../Instruction/Function";

export class Ambit {
    public variables: Map<string, Symbol>;
    public funciones: Map<string, Function>;
    public name:string;
    public subAmbits: Ambit[];  // Lista de subámbitos
    constructor(public previous: Ambit | null,name:string) {
        this.variables = new Map()
        this.funciones=new Map()
        this.name=name;
        this.subAmbits = [];
    }

    public setVal(id: string, value: any, type: Type, line: any, column: any) {
        // Verifica si la variable ya existe en el ámbito actual
        if (this.variables.has(id)) {
            const val = this.variables.get(id);
            if (val?.type == type) {
                // Sobrescribe solo si existe en este ámbito y el tipo coincide
                this.variables.set(id, new Symbol(value, id, type, line, column, this.name));
            } else {
                throw new Error_(line, column, 'Semantico', 'No se puede asignar: ' + type + ' a ' + val?.type);
            }
        } else {
            // Si la variable no existe en el ámbito actual, la crea
            this.variables.set(id, new Symbol(value, id, type, line, column, this.name));
        }
    }

    public getVal(id: string): Symbol|null|undefined {
        let env: Ambit | null = this
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id)
            }
            env = env.previous
        }

        return null
    }

    public guardarFuncion(id: string, funcion: Function) {
        this.funciones.set(id, funcion)
    }

    public getFuncion(id: string): Function {
        let env: Ambit | null = this
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id)
            }
            env = env.previous
        }
        return null
    }


    public getGlobal() {
        let env: Ambit | null = this
        while (env?.previous != null) {
            env = env.previous
        }
        return env
    }

    // Función para agregar un subámbito
    public agregarSubAmbito(ambito: Ambit) {
        this.subAmbits.push(ambito);
    }
}