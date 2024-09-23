

export let globalVariable: string = "";

export function setGlobalVariable(value: string) {
    globalVariable = value;
}

export function addNewInformation(value: string) {
    globalVariable = globalVariable+value;
}