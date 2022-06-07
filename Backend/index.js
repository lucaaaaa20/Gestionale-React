const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const app = express();

var cors = require('cors')
app.use(cors())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const port = 4000
const host = "localhost"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "localhost",
    database: "magazzino"
})

app.listen(port, host, () => {
    console.log(`Sono connesso all'indirizzo http://${host}:${port}`)
})

// ------------------------------------------ REST PRODOTTI -----------------------------------------------//
  // ----------------------------------------------------------------------------------------------------//

app.get("/magazzino/prodotti", (req, res) => {
    connection.query("SELECT * FROM prodotti", (errore, risultato, campi) => {
        if (!errore)
            res.json({
                status: "success",
                data: risultato
            });
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

app.delete("/magazzino/prodotti/:id", (req, res) => {
    connection.query(`DELETE FROM prodotti WHERE prodottoID = ${req.params.id}`, (errore, risultato, campi) => {
        if (!errore)
            res.json({
                status: "success",
                data: risultato
            });
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

app.put("/magazzino/prodotti/:id", (req, res) => {
    connection.query(`UPDATE prodotti SET codice = ${req.body.codice}, nome = "${req.body.nome}", descrizione = "${req.body.descrizione}",image = "${req.body.image}",prezzo = ${req.body.prezzo},sconto = ${req.body.sconto}  WHERE prodottoID = ${req.params.id}`, (errore, risultato, campi) => {
        if (!errore)
            res.json({
                status: "success",
                data: risultato
            });
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

app.post("/magazzino/prodotti", (req, res) => {
    connection.query(`INSERT INTO prodotti (codice, nome, descrizione, image, prezzo, sconto) VALUES ("${req.body.codice}", "${req.body.nome}", "${req.body.descrizione}", "${req.body.image}", "${req.body.prezzo}", "${req.body.sconto}" )`, (errore, risultato, campi) => {
        if (!errore)
            res.json(true);
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

app.get("/magazzino/prodotti/:id", (req, res) => {
    connection.query(`SELECT * FROM prodotti WHERE prodottoID = ${req.params.id}`, (errore, risultato, campi) => {
        if (!errore)
            res.json({
                status: "success",
                data: risultato[0]
            });
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})

// ------------------------------------------ REST ACCOUNT -----------------------------------------------//
  // ----------------------------------------------------------------------------------------------------//

app.post("/magazzino/account", (req, res) => {
    connection.query(`SELECT * FROM account WHERE email = "${req.body.email}" AND password = "${req.body.password}"`, (errore, risultato, campi) => {
        if (!errore && risultato.length == 1)
            res.json(true);
        else
            res.json({
                status: "error",
                data: errore.sqlMessage
            })
    })
})  