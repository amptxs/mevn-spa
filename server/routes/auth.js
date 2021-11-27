var express = require('express');
var router = express.Router();
module.exports = router;

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "652656483775-pc2sf0ai43upe7rn6us1nrquseumfb8j.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://typerProject:typer@typermaincluster-shard-00-00.j5kmc.mongodb.net:27017,typermaincluster-shard-00-01.j5kmc.mongodb.net:27017,typermaincluster-shard-00-02.j5kmc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-h4rylu-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
mongoClient.connect();
const db = mongoClient.db("MEVN");
const collection = db.collection("Users");

router.get('/', function (req, res, next) {
    res.send('Auth page');
});

router.post('/', function (req, res, next) {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        var payload = ticket.getPayload();
        return payload
    }

    (async () => {
        var payload = await verify();
        if (await userIsRegistered(payload['sub']) === false)
            userCreate(payload['sub'], payload['given_name'], payload['picture']);

        const userData = await getUserData(payload['sub']);
        return res.send({"token": token, "given_name": userData[0]['Name'], "picture": userData[0]['Picture'],"points": userData[0]['Score']});
    })()

});

function userCreate(id, name, picture) {
    let user = {Id: id, Name: name, Picture: picture, Score: 0};
    collection.insertOne(user);
    console.log("User created " + id);
}

async function userIsRegistered(userid) {
    return new Promise(function(resolve, reject) {
        collection.find({"Id": userid}).toArray(function (err, result) {
            resolve(result.length !== 0)
        });
    });
}

async function getUserData(userid) {
    return new Promise(function(resolve, reject) {
        collection.find({"Id": userid}).toArray(function (err, result) {
            resolve(result)
        });
    });
}


