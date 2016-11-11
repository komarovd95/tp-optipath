import vis from 'vis';

export function draw() {
    const nodes = [
        {id: 1,  value: 2},
        {id: 2,  value: 31},
        {id: 3,  value: 12},
        {id: 4,  value: 16},
        {id: 5,  value: 17},
        {id: 6,  value: 15},
        {id: 7,  value: 6},
        {id: 8,  value: 5},
        {id: 9,  value: 30},
        {id: 10, value: 18},
    ];

    // create connections between people
    // value corresponds with the amount of contact between two people
    const edges = [
        {from: 2, to: 8, value: 1 },
        {from: 8, to: 2, value: 1 },
        {from: 2, to: 9, value: 5 },
        {from: 2, to: 10,value: 1 },
        {from: 4, to: 6, value: 8 },
        {from: 5, to: 7, value: 2 },
        {from: 4, to: 5, value: 1 },
        {from: 9, to: 10,value: 2 },
        {from: 2, to: 3, value: 6 },
        {from: 3, to: 9, value: 4 },
        {from: 5, to: 3, value: 1 },
        {from: 2, to: 7, value: 4 }
    ];

    // Instantiate our network object.
    const container = document.getElementById('my-graph'); // TODO

    console.log(container);

    const data = {
        nodes,
        edges
    };

    const options = {
        nodes: {
            shape: 'dot',
        },
        edges: {
            smooth: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            navigationButtons: true,
            keyboard: true
        },
        manipulation: {
            enabled: true
        }
    };

    const network = new vis.Network(container, data, options);
}