import { OptionalId } from "mongodb";

export type Vuelo = {
    id: string,
    origen: string,
    destino: string,
    fechayhora: string

}

export type VueloModel = OptionalId <{
    origen: string,
    destino: string,
    fechayhora: string
}>; 