const express = require("express");
const body_parser = require('body-parser');
const app = express();
const control_root = "/control";

let endpoints = {
    bookflight:   { name: "Book Flight",   path: "/flight", method: "post"   },
    bookhotel:    { name: "Book Hotel",    path: "/hotel",  method: "post"   },
    bookcar:      { name: "Book Car",      path: "/car",    method: "post"   },
    cancelflight: { name: "Cancel Flight", path: "/flight", method: "delete" },
    cancelhotel:  { name: "Cancel Hotel",  path: "/hotel",  method: "delete" },
    cancelcar:    { name: "Cancel Car",    path: "/car",    method: "delete" }
};

app.use(body_parser.json());
app.get(control_root + "/endpoints", (req, res) => {
    res.status(200).json(endpoints).end();
});

Object.keys(endpoints).map( (id) => {
    const endpoint = endpoints[id];
    endpoint.requests = [];
    endpoint.response = {status: 200, body: ""};
    app[endpoint.method](endpoint.path, (req, res) => {
        endpoint.requests.push({method: req.method,
                                status: endpoint.response.status,
                                body: req.body,
                                path: req.path,
                                headers: req.headers});
        res.status(endpoint.response.status).json(endpoint.response.body).end();
    });

    app.post(control_root + endpoint.path, (req, res) => {
        endpoint.response = req.body;
        res.status(200).json(endpoint).end();
    });
});

app.listen(3001, function () {
    console.log("BS server listening on port 3001!");
});
