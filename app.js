const cors = require('cors')
const express = require('express')
const usersRoute = require('./users/routes')
const favsRoute = require('./listFavs/routes')

const app = express();
//Middleware
app.use(cors())
app.use(express.json())

app.use("/auth/local", usersRoute);
app.use("/api/favs", favsRoute);

module.exports = app;