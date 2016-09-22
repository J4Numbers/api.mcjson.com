var graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: "BlockFlags",
    fields: {
        physics: {
            description: "Does this block obey physics (sand/gravel/anvil)",
            type: graphql.GraphQLBoolean
        },
        hardness: {
            description: "Resistance to explosions",
            type: graphql.GraphQLInt
        },
        unpushable: {
            description: "Does this block prevent piston movement",
            type: graphql.GraphQLBoolean
        },
        transparent: {
            description: "Is this block transparent (no suffocate damage)",
            type: graphql.GraphQLBoolean
        },
        light: {
            type: new graphql.GraphQLObjectType({
                name:"BlockFlagsLight",fields:{
                    emit: {description: "Amount of light emitted by block",type: graphql.GraphQLInt},
                    decay: {description: "Amount of light that is dropped as it passes through this block", type: graphql.GraphQLInt}
                }
            })
        }
    }
});
