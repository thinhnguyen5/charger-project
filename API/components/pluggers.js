const express = require('express');
const db = require('../db');
const router = express.Router();

//  Return all plug information
router.get('/', (req, res) => {
    db.query('SELECT * FROM plugger').then(results => {
        res.json({ pluggers: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//  Return information of a single plug
router.get('/:plugId', (req, res) => {
    db.query('SELECT * FROM plugger where id = ?', [req.params.plugId])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})


router.post('/', (req, res) => {

    db.query('INSERT INTO plugger (digit, name, type, connector, free, electricity, address, city,lat,lng ) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [req.body.digit, req.body.name, req.body.type, req.body.connector, req.body.free, req.body.electricity, req.body.address,req.body.city, req.body.lat,req.body.lng])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });

});

router.delete('/:plugID', (req, res) => {
    db.query('DELETE FROM plugger where id = ?', [req.params.plugID])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;