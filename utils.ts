import {Vuelo, VueloModel} from "./types.ts"

export const fromModeltoVuelo = (vModel: VueloModel): Vuelo  =>{
    return{
        id: vModel._id!.toString(), //Al momento de transformar de model a type, mongodb siempre creara un ID por eso se pone !
        origen: vModel.origen,
        destino: vModel.origen,
        fechayhora: vModel.fechayhora
    };
};