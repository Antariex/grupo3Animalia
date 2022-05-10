const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.get('/views/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"))
})

app.get('/views/productCart.html', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/productCart.html"))
})

app.get('/views/productDetail.html', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/productDetail.html"))
})

app.get('/views/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/register.html"))
})