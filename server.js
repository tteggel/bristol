const express = require('express');
const app = express();

let endpoints = {
    bookflight:   { name: "Book Flight",   path: "/flight", method: "post"   },
    bookhotel:    { name: "Book Hotel",    path: "/hotel",  method: "post"   },
    bookcar:      { name: "Book Car",      path: "/car",    method: "post"   },
    cancelflight: { name: "Cancel Flight", path: "/flight", method: "delete" },
    cancelhotel:  { name: "Cancel Hotel",  path: "/hotel",  method: "delete" },
    cancelcar:    { name: "Cancel Car",    path: "/car",    method: "delete" }
};

app.get('/control/endpoints', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(endpoints));
    res.end();
});

Object.keys(endpoints).map( (id) => {
    const endpoint = endpoints[id];
    endpoint.requests = [];
    app[endpoint.method](endpoint.path, (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        endpoint.requests.push({method: req.method, body: req.body, path: req.path, headers: req.headers});
        res.end();
    });
});

app.listen(3001, function () {
    console.log('BS server listening on port 3001!');
});
