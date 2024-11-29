import { Collection, ObjectId } from "mongodb";
import { Vuelo, VueloModel } from "./types.ts";
import { fromModeltoVuelo } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      args: { origen?: string; destino?: string },
      context: { VuelosCollection: Collection<VueloModel> },
    ): Promise<Vuelo[]> => {
      const { origen, destino } = args;
      const query: any = {};
      if (origen) query.origen = origen;
      if (destino) query.destino = destino;

      const vuelosModel = await context.VuelosCollection.find(query).toArray();
      return vuelosModel.map((vueloModel) => fromModeltoVuelo(vueloModel));
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: { VuelosCollection: Collection<VueloModel> },
    ): Promise<Vuelo | null> => {
      const vueloModel = await context.VuelosCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!vueloModel) {
        return null;
      }
      return fromModeltoVuelo(vueloModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string; fechayhora: string },
      context: { VuelosCollection: Collection<VueloModel> },
    ): Promise<Vuelo> => {
      const { origen, destino, fechayhora } = args;

      const { insertedId } = await context.VuelosCollection.insertOne({
        origen,
        destino,
        fechayhora,
      });

      const vueloModel = {
        _id: insertedId,
        origen,
        destino,
        fechayhora,
      };
      return fromModeltoVuelo(vueloModel);
    },
  },
};
