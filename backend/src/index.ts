import express from 'express';
const parser = require('./grammar/grammar.js');
import { Ambit } from './interpreter/Ambit/Ambit.js';
import { Function } from './interpreter/Instruction/Function.js';
import { globalVariable } from './output/Global.js';
import cors from "cors";
const app=express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
const port =3080;
let globalAmbit = new Ambit(null,"Global");
app.get('/',(_req,res)=>{
    console.log('We are working on backend');
    res.send('Hello from backend');
})

app.post('/execute',(req,res)=>{
    console.log('Compiling.....');
    console.log(req.body)
    const ast = parser.parse(req.body.entrada)
    try {
        //globalAmbit = new Ambit(null)
        for (const instr of ast) {
            try {
                if (instr.paramsIDs){
                    instr.execute(globalAmbit);
                }            
            } catch (error) {
                console.log(error)
            }
        }
        for (const inst of ast) {
            if (!(inst instanceof Function)) {
                inst.execute(globalAmbit);
            }
        }
        console.log("Ejecucion terminada")
        return res.send({"output":globalVariable})
    } catch (error) {
        console.log(error)
    }
    
});

app.get('/symbols', (_req, res) => {
    const symbolObject: any = {};

    // Función recursiva para obtener variables de todos los ámbitos y subámbitos
    function getAllVariables(ambito: Ambit) {
        // Guardar las variables del ámbito actual
        symbolObject[ambito.name] = {};
        ambito.variables.forEach((value, key) => {
            symbolObject[ambito.name][key] = {
                value: value.value,
                line: value.line,
                column: value.column,
                ambitName: value.ambitName
            };
        });

        // Recursión para los subámbitos
        for (const subAmbito of ambito.subAmbits) {
            getAllVariables(subAmbito);
        }
    }

    // Iniciar el recorrido desde el ámbito global
    getAllVariables(globalAmbit);

    res.send(JSON.stringify(symbolObject));
});
app.get('/functions',(_req,res)=>{
    const symbolObject: any = {};
    
    globalAmbit.funciones.forEach((value, key) => {
        symbolObject[key] = {
            id: value.id,
        };
    });

    res.send(JSON.stringify(symbolObject));
})



app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

