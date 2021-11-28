var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectId;
module.exports = router;
var XMLHttpRequest = require('xhr2');
var connectables = require('../connectables')
const collection = connectables.dataBase.collection("Users");

router.get('/', function (req, res)
{
    collection.find({}).sort({"Score": "desc"}).limit(5).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//{
//   "id":"105288700383642826619"
//}
router.post('/', function (req, res, next) {
    collection.find({"Id": req.body.id}).toArray(function(err, result)
    {
        var newScore = result[0]['Score'] + 0.01;
        var newvalues = {$set: {Score: parseFloat(newScore.toFixed(2))}};
        var filter = { "_id": result[0]['_id']}
        collection.updateOne(filter, newvalues, function (err, res) {
            if (err) throw err;
            console.log(result[0]['Id'] + " just gained 0.01 point");
        });
    });
    res.send("Success")
});

