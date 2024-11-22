const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4040;
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader("ngrok-skip-browser-warning", "true");
    next();
});

app.get('/minesweeper', function(req, res) {
    res.sendFile('./minesweeper/minesweeper.html', {root: __dirname});
});

app.get('/minesweeper.js', function(req, res) {
    res.sendFile('./minesweeper/minesweeper.js', {root: __dirname});
});

app.get('/minesweeper.css', function(req, res) {
    res.sendFile('./minesweeper/minesweeper.css', {root: __dirname});
});

app.get('/assets/flag.png', function(req, res) {
    res.sendFile('./minesweeper/assets/flag.png', {root: __dirname});
});

app.get('/assets/mine.png', function(req, res) {
    res.sendFile('./minesweeper/assets/mine.png', {root: __dirname});
});

app.use((req,res) => {
    console.log(req.headers.referer);
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});

app.listen(port);

console.log('waiting');

(async function() {
    const url = await ngrok.connect({proto: 'http', addr: port, authtoken_from_env: true})
    .then(listener => console.log(`Ingress established at: ${listener.url()}`));
});
