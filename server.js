const express = require('express');
const app = express();
const fs = require('fs');
// Inicia el server
app.listen(3000);
console.log( "Server listening at port: 3000");

let items = 0;
let random = 0;

app.get('/items', (req, res) => {
    items = items + 1;
    try {
        fs.readFile('./productos.txt', 'utf-8', function(error, data) {
            if (error) {
                throw error;
            }
            res.json({ items: JSON.parse(data), cantidad: JSON.parse(data).length });
        });
    } catch (error) {
        res.status(409).send(error);
    }
})



app.get('/random', (req, res) => {
    random = random + 1;
    try {
        fs.readFile('./productos.txt', 'utf-8', function(error, data) {
            if (error) {
                throw error;
            }
            const file = JSON.parse(data);
            const randomNumber = Math.round(Math.random() * (file.length - 1) + 1) - 1;
            res.json({ item: file[randomNumber] });
        });
    } catch (error) {
        res.status(409).send(error);
    }
})

app.get('/views', (req, res) => {
    if (items != 0 || random != 0) {
        const response = {
            visitas: {
                items: items,
                item: random
            }
        }
        res.json(response);
    } else {
        res.status(409).send("El servidor no tuvo consumos");
    }
})