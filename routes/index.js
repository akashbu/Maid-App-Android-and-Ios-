var express = require('express');
var router = express.Router();
var firebase = require('../config/db');
var admin = require('firebase-admin');
var fs = require('fs');
var csv = require('csv-parser');

var db = firebase.database();

var requests = [];
var data = {};

router.get('/', function (req, res) {

    fs.createReadStream('form.csv')
        .pipe(csv())
        .on('data', function (data) {
            try {
                console.log(data);

            }
            catch (err) {
                throw err;
            }
        })
        .on('end', function () {
        });

    res.render('home', { requests: requests });
});

router.get('/api', function (req, res) {
    var retrievedData;
    var ref = db.ref("/users");
    ref.once("value", function (snapshot) {
        retrievedData = snapshot.val();
        var users = [];
        snapshot.forEach(function (element) {
            var temp = {
                Name: element.val().Name,
                Contact: element.val().Contact,
                Locality: element.val().Locality,
                Alloted_Maids: element.val().Alloted_Maids
            }
            users.push(temp);
        });
        //console.log(retrievedData.users);
        res.json(users);
    });
});

router.post('/confirm', function (req, res) {
    //console.log(data.userid, data.maidid);
    var userid = data.userid;
    var maidid = data.maidid;
    //console.log(userid,maidid);

    var ref = db.ref('/users/' + userid);
    ref.once("value", function (snapshot) {
        //console.log(snapshot.val());
        var user = {
            uid: userid,
            name: snapshot.val().Name,
            contact: snapshot.val().Contact,
            location: snapshot.val().Location,
            maids: snapshot.val().Alloted_Maids
        }

        if (!user.maids) {
            user.maids = [];
        }
        user.maids.push(maidid);

        db.ref('/users/' + userid).set({
            Name: user.name,
            Contact: user.contact,
            Location: user.location,
            Alloted_Maids: user.maids
        });

        db.ref('/maids/' + maidid).once("value", function (msnapshot) {
            //console.log(msnapshot.val());
            var maid = {
                uid: maidid,
                name: msnapshot.val().Name,
                age: msnapshot.val().Age,
                contact: msnapshot.val().Contact,
                workarea: msnapshot.val().Workarea,
                worktype: msnapshot.val().Worktype,
                currentjobs: msnapshot.val().Currentjobs
            }

            if (!maid.currentjobs) {
                maid.currentjobs = [];
            }
            maid.currentjobs.push(userid);
            db.ref('/maids/' + maidid).set({
                Name: maid.name,
                Age: maid.age,
                Contact: maid.contact,
                Workarea: maid.workarea,
                Worktype: maid.worktype,
                Currentjobs: maid.currentjobs
            });
        });

    });

    res.redirect('/');
});

// router.get('/okay', function(req, res) {
//     res.json('haha');
// });

router.post('/', function (req, res) {

    data = {};
    data.user = req.body.user;
    data.maid = req.body.maid;
    data.maidno = req.body.maidno;
    data.userid = req.body.userid;
    data.maidid = req.body.maidid;

    requests.push(data);
    console.log(requests);
});

module.exports = router;