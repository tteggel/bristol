const express = require("express");
const body_parser = require('body-parser');
const app = express();
const control_root = "/control";

let endpoints = {
    bookflight:   { name: "Book Flight",   path: "/flight", method: "post",   response: {status: 200, body: {confirmation: "boom"}}},
    bookhotel:    { name: "Book Hotel",    path: "/hotel",  method: "post",   response: {status: 200, body: {confirmation: "432156899"}}},
    bookcar:      { name: "Book Car",      path: "/car",    method: "post",   response: {status: 200, body: {confirmation: "HZ67891"}}},
    cancelflight: { name: "Cancel Flight", path: "/flight", method: "delete", response: {status: 200, body: {}}},
    cancelhotel:  { name: "Cancel Hotel",  path: "/hotel",  method: "delete", response: {status: 200, body: {}}},
    cancelcar:    { name: "Cancel Car",    path: "/car",    method: "delete", response: {status: 200, body: {}}},
    email:        { name: "Send Email",    path: "/email",  method: "post",   response: {status: 200, body: {staus: "Done"}}}
};

app.use(body_parser.json());
app.get(control_root + "/endpoints", (req, res) => {
    res.status(200).json(endpoints).end();
});

Object.keys(endpoints).map( (id) => {
    const endpoint = endpoints[id];
    endpoint.requests = [];
    app[endpoint.method](endpoint.path, (req, res) => {
        endpoint.requests.push({
            timestamp: Date.now(),
            method: req.method,
            response: {
                status: endpoint.response.status,
                body: endpoint.response.body
            },
            body: req.body,
            path: req.path,
            headers: req.headers});
        res.status(endpoint.response.status).json(endpoint.response.body).end();
    });

    app.post(control_root + '/' + id, (req, res) => {
        endpoint.response = req.body;
        res.status(200).json(endpoint).end();
    });
});

app.delete(control_root + '/endpoints/requests', (req, res) => {
    Object.keys(endpoints).map( (id) => {
        endpoints[id].requests =[];
    });
});

app.listen(3001, function () {
    console.log("BS server listening on port 3001!");
});
