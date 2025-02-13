//All the global data structures are maintained here

const TIME_OUT = - 234;
var sampleGlobal = "Accessing global";

//colors
var Colors = { 
    node_bg_color: "#ffe800",
    temp_selected_node_bg_color: "red",
    edge_bg_color: "#ff5733",
    edge_visited_bg_color: "lime"
};

// Initialize adjacency matrix
var adjacencyMatrix = [];

// Store graph data
var nodeCount = 0;
var isDirected = false; // Toggle for directed/undirected mode


//Algorithms
var algoList; // Will hold the algorithm names + other data
var algorithms = []; // Will hold the algorithm names
var algoListLocation = './Algorithms/list.json';
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//For the animatation in the simulation
var TIME_INTERVAL = 200; //In ms






