const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4040;
//const ngrok = require('@ngrok/ngrok');
//app.use(express.static('./views', {index: 'index.html'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader("ngrok-skip-browser-warning", "true");
    next();
});

//app.set('view engine', 'ejs');

/*
const server = http.createServer(function (req, res) {
    const url = req.url;
    try{

    switch (url) {
        case "/":
            //a 200 response
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write('./views/index.html', {root: __dirname});
            console.log('done');
            break;
        default:
            //404
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write('./views/404.html', {root: __dirname});
            console.log('404');
            break;
    }
    //res.write('./views/css/index.css', {root: __dirname});
    res.end();
    }catch(error){console.log(error);}
});

server.listen(3000, function () {
    console.log("server started at port 3000");
});
*/

//home, projects, units, about me
/*

app.get('/assets/heart.png', function(req, res) {
    res.sendFile('./hearthands/2024/assets/heart.png', {root: __dirname});
});

app.get('/assets/happy_sparkle.png', function(req, res) {
    res.sendFile('./hearthands/2024/assets/happy_sparkle.png', {root: __dirname});
});

app.get('/index.css', function(req, res) {
    res.sendFile('./hearthands/2024/index.css', {root: __dirname});
});

app.get('/assets/canvas.js', function(req, res) {
    res.sendFile('./hearthands/2024/assets/canvas.js', {root: __dirname, headers: {'Content-Type': 'application/javascript'}});
});

app.get('/hearthands', function(req, res) {
    res.sendFile('./hearthands/2024/index.html', {root: __dirname});
});
*/

app.get('/flowsim', function(req, res) {
    res.sendFile('./FlowSim/index.html', {root: __dirname});
});

app.get('/sim.css', function(req, res) {
    res.sendFile('./FlowSim/sim.css', {root: __dirname});
});

app.get('/sim.js', function(req, res) {
    res.sendFile('./FlowSim/sim.js', {root: __dirname});
});

app.use((req, res, next) => {
    res.setHeader("ngrok-skip-browser-warning", "true");
    next();
});

app.get('/', (req,res) => {
    res.redirect(302, '/home');
});

app.get('/home', (req,res) => {
    res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/project', (req,res) => {
    res.sendFile('./views/projects.html', {root: __dirname});
});

app.get('/units', (req,res) => {
    res.sendFile('./views/units.html', {root: __dirname});
});

app.get('/about_me', (req,res) => {
    res.sendFile('./views/aboutMe.html', {root: __dirname});
});

app.get('/css/index.css', function(req, res) {
    //res.sendFile(__dirname + './views/css/index.css');
    res.sendFile('./views/css/index.css', {root: __dirname});
});

app.get('/css/projects.css', function(req, res) {
    res.sendFile('./views/css/projects.css', {root: __dirname});
});

app.get('/css/aboutMe.css', function(req, res) {
    res.sendFile('./views/css/aboutMe.css', {root: __dirname});
});

app.get('/css/units.css', function(req, res) {
    res.sendFile('./views/css/units.css', {root: __dirname});
});

app.get('/css/404.css', function(req, res) {
    res.sendFile('./views/css/404.css', {root: __dirname});
});

app.get('/css/images/cafe.gif', function(req, res) {
    res.sendFile('./views/images/cafe.gif', {root: __dirname});
});

app.get('/images/favicon.ico', function(req, res) {
    res.sendFile('./views/images/favicon.ico', {root: __dirname});
});

app.get('/js/projects.js', function(req, res) {
    res.sendFile('./views/js/projects.js', {root: __dirname});
});

app.get('/js/index.js', function(req, res) {
    res.sendFile('./views/js/index.js', {root: __dirname});
});

app.get('/js/units.js', function(req, res) {
    res.sendFile('./views/js/units.js', {root: __dirname});
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

app.get('/minesweeperRPG', function(req, res) {
    res.sendFile('./minesweeperRPG/minesweeperRPG.html', {root: __dirname});
});

app.get('/minesweeperRPG.js', function(req, res) {
    res.sendFile('./minesweeperRPG/minesweeperRPG.js', {root: __dirname});
});

app.get('/minesweeperRPG.css', function(req, res) {
    res.sendFile('./minesweeperRPG/minesweeperRPG.css', {root: __dirname});
});

app.get('/css/images/x.png', function(req, res) {
    res.sendFile('./views/images/x.png', {root: __dirname});
});

app.get('/css/images/plus.png', function(req, res) {
    res.sendFile('./views/images/plus.png', {root: __dirname});
});

app.get('/images/pfp.png', function(req, res) {
    res.sendFile('./views/images/pfp.png', {root: __dirname});
});

app.get('/images/canvasSS.png', function(req, res) {
    res.sendFile('./views/images/canvasSS.png', {root: __dirname});
});

app.get('/images/minesweeperSS.png', function(req, res) {
    res.sendFile('./views/images/minesweeperSS.png', {root: __dirname});
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
