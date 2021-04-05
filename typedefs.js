const {gql} = require('apollo-server');

const typeDefs = gql`


  type Query {
    stadiums: [Stadiums]
    stadium (id: Int): Stadiums
    teams: [Teams]
    team (id: Int): Teams
    groups: [Groups]
    group (group: String): Groups
  }
  
  type Stadiums {
    id: Int
    name: String
    city: String
    latitude: Float
    logitude: Float
    image: String
  }
  type Teams {
    id: Int
    name: String
    eliminated: Boolean
    eliminated_at_which_stage: String
    fifa_code: String
    iso2: String
    flag: String
    emoji: String
    emoji_string: String
  }
  type Groups {
    name: String
    winner: Teams
    runnerup: Teams
    matches: [Matches]
  }
  type Matches {
    id: Int!
    home_team: Teams!
    away_team: Teams!
    home_score: String!
    away_score: String!
    home_penalty: String
    away_penalty: String
    finished: Boolean!
    date: String!
    winner: String
    stadium: Stadiums!
  }

`;


module.exports = typeDefs;


//groups: [Groups]