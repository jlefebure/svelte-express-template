import express from 'express'
import bodyParser from 'body-parser'
import errorhandler from 'errorhandler'
import cors from 'cors'
import methodOverride from 'method-override'
import api from './server/routes/index.mjs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import settings from "./settings.mjs";
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

// Normal express config defaults
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(settings.SVELTE_CLIENT_BASE_URL, express.static(__dirname + '/../public'));

if (!isProduction) {
    app.use(errorhandler());
}

app.use(settings.SVELTE_API_BASE_URL, api);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

// finally, let's start our server...
var server = app.listen(settings.SVELTE_PORT, function () {
    console.log('Server listening on port ' + server.address().port);
    console.log('Client exposed on ' + settings.SVELTE_EXTERNAL_URL + settings.SVELTE_CLIENT_BASE_URL);
    console.log('Server exposed on ' + settings.SVELTE_EXTERNAL_URL + settings.SVELTE_API_BASE_URL);
});