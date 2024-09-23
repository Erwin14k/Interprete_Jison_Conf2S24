import { Type } from "../Expression/Returnal";

export class Symbol {
    constructor(public value:any,public id:string, public type:Type,
        public line:number,public column:number,public ambitName:string
     ){ }
}