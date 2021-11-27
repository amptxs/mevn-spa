var express = require('express');
var router = express.Router();

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "652656483775-pc2sf0ai43upe7rn6us1nrquseumfb8j.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://typerProject:typer@typermaincluster-shard-00-00.j5kmc.mongodb.net:27017,typermaincluster-shard-00-01.j5kmc.mongodb.net:27017,typermaincluster-shard-00-02.j5kmc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-h4rylu-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
mongoClient.connect();
const db = mongoClient.db("MEVN");

module.exports ={
    dataBase: db,
    CLIENT_ID: "652656483775-pc2sf0ai43upe7rn6us1nrquseumfb8j.apps.googleusercontent.com",
    Client: client
}