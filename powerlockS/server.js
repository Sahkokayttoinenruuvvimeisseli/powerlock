import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';
var fileUpload = require('express-fileupload');
var dbSchema = require("./data/dbSchema");
var bodyParser = require('body-parser');

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

const graphQLServer = express();
graphQLServer.use('/api', graphQLHTTP({ schema, graphiql: true, pretty: true }));
//graphQLServer.listen(APP_PORT, () => console.log(
//    `GraphQL Server is now running on http://localhost:${APP_PORT}`
//));


const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/,
            },
        ],
    },
    output: { filename: 'app.js', path: '/' }
});

const app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(fileUpload());

app.post("/upload", function (req, res, next) {
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    if (!req.body.personId) {
        res.send('No person id');
        return;
    }

    var userPhoto = req.files.userPhoto;

    var filename = new Date() + userPhoto.name
    //dbSchema.Person.findById(req.body.personId).then(function (person) {
    //    person.Profilepicurl = 
    //});


    userPhoto.mv("./uploads/" + filename , function () {

    });

    res.send("file uploaded");
});

app.get("/download", function (req, res, next) {

});

//app.get("/", function (req, res, next) {
//    res.send("Hello");
//});

app.listen(3001);

const webPackApp = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    publicPath: '/js/'
});

webPackApp.use('/', express.static(path.resolve(__dirname, 'public')));

webPackApp.use("/api", graphQLHTTP({
    schema, graphiql: true, pretty: true
}));

webPackApp.use("/files", app);




webPackApp.listen(APP_PORT, () => {
    console.log("server running");
});