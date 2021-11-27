var express = require('express');
var connectables = require('../connectables')
var router = express.Router();
module.exports = router;
const collection = connectables.dataBase.collection("Users");

router.get('/', function (req, res, next) {
    res.send('Auth page');
});

router.post('/', function (req, res, next) {
    let token = req.body.token;

    async function verify() {
        const ticket = await connectables.Client.verifyIdToken({
            idToken: token,
            audience: connectables.CLIENT_ID,
        });
        var payload = ticket.getPayload();
        return payload
    }

    (async () => {
        var payload = await verify();
        if (await userIsRegistered(payload['sub']) === false)
            userCreate(payload['sub'], payload['given_name'], payload['picture']);

        const userData = await getUserData(payload['sub']);
        return res.send({"token": token, "given_name": userData[0]['Name'], "picture": userData[0]['Picture'],"points": userData[0]['Score'], "id": payload['sub']});
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


