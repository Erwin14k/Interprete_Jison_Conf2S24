export enum Type {
    NUMBER = 0,
    STRING = 1,
    BOOLEAN = 2
}

export type Returnal = {
    value: any,
    type: Type
}

export const types = [
    [   //Number, string, error, error
        Type.NUMBER, Type.STRING, Type.NUMBER
    ],
    [ //String, string, string, error
        Type.STRING, Type.STRING, Type.STRING
    ],
    [ //error, string, bool, error, 
        Type.NUMBER, Type.STRING, Type.NUMBER
    ]
];