const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    // return all categories
    const queryText = `SELECT * FROM "movies"`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

router.get('/:movie', (req, res) => {
    let movie = req.params.movie;
    console.log('movie param: ', movie)
    const queryText = `
        SELECT "genres".name FROM "movies"
        JOIN "movies_genres" ON "movies".id = "movies_genres".movies_id
        JOIN "genres" ON "movies_genres".genres_id = "genres".id
        WHERE "movies".title = '${movie}';
        `;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Ope! Error on ${movie} query`);
            res.sendStatus(500);
        });
})

router.put('/', (req, res) => {
    let id = req.body.id;
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    const queryText = `
        UPDATE "movies"
        SET "title" = $1, "description" = $2
        WHERE "id" = $3;
        `
    console.log(queryText)
    pool.query(queryText, [title, description, id])
    .then( (result) => {
        console.log('Update successful!')
    })
    .catch( (error) => {
        console.log('Ope! Error with PUT request');
        res.sendStatus(500);
    })
})

module.exports = router;
