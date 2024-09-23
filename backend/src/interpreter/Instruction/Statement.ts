import { Ambit } from "../Ambit/Ambit";
import { Instruction } from "./Instruction";

export class Statement extends Instruction {
    constructor(private code: Instruction[], line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambit) {
        // No crear un nuevo ámbito, utilizar el que se pasa como parámetro (el de la función)
        for (const inst of this.code) {
            try {
                const element = inst.execute(ambito);  // Utilizar el ambito existente

                if (element != null && element != undefined) return element;

            } catch (error) {
                console.log(error);
            }
        }
    }
}