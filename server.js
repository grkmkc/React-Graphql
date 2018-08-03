const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const bodyParser  = require('body-parser');

//Bring in graphql express
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');

const { makeExecutableSchema } = require('graphql-tools');


const { typeDefs } = require('./schema');
const { resolver } = require('./resolver');


const schema = makeExecutableSchema({
        typeDefs,
        resolver
})

//Connects to database
mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log('db connected'))
        .catch(err => console.error(err));




//Initialize app
const app = express();

//Create GraphiQl application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphiql'}))


//Connect schemas with GraphQL
app.use(
        "/graphql",
        bodyParser.json(),
        graphqlExpress({
                schema,
                context:{
                        Recipe,
                        User
                }
        })
)




const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
})
