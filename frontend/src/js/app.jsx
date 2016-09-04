const vis = require('vis');

var nodes = new vis.DataSet([
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6}
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 6, to: 4}
]);

// create a network
var container = document.getElementById('my-graph');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    layout: {
        randomSeed: 1,
        improvedLayout: true
    },
    physics: {
        enabled: false
    },
    edges: {
        smooth: false
    }
};

var network = new vis.Network(container, data, options);
console.log(network.body.nodes);