const wcdata = require('./data/world-cup.json');

const resolvers = {
  Query: {
    stadiums: () => wcdata.stadiums,
    stadium: (_, args) => wcdata.stadiums.find( ({ id }) => id == args.id),
    teams: () => wcdata.teams,
    team: (_, args) => wcdata.teams.find( ({ id }) => id == args.id),
    groups: () => Object.values(wcdata.groups),
    group: (_, args) => wcdata.groups[args.group]
  },
};

//console.log(wcdata.stadiums);  //eslint-disable-line no-console

module.exports = resolvers;