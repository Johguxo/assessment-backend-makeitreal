const cors = require('cors')
const express = require('express')
const usersRoute = require('./users/routes')
const favsRoute = require('./listFavs/routes')
const worldRoute = require('./world/routes')

const app = express();
//Middleware
app.use(cors())
app.use(express.json())

app.use("/auth/local", usersRoute);
app.use("/api/favs", favsRoute);
app.use("/api/world", worldRoute);

module.exports = app;