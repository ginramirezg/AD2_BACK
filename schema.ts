export const schema = `#graphql
type Vuelo {
    # El ! indica obligatoriedad
    id: ID!
    origen: String!
    destino: String!
    fechayhora: String! 
}

type Query {
    #Recupera un vuelo por su ID, devuelve null si no existe
    getFlight(id: ID!): Vuelo

    #Recupera vuelos con filtros opcionales de origen y destino
    getFlights(origen: String, destino: String): [Vuelo!]!
}

type Mutation {
    #Crea un nuevo vuelo y devuelve sus datos, incluyendo su ID
    addFlight(origen: String!, destino: String!, fechayhora: String!): Vuelo!
}
`;
