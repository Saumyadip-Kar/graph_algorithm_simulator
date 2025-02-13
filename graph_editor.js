document.addEventListener("DOMContentLoaded", function () {
    //...
    // Initialize Cytoscape inside the "cy" div
    const graphEditor = cytoscape({
        container: document.getElementById("cy"),
        elements: [], // Empty graph initially
        wheelSensitivity: 0.1,
        style: [
            {
                selector: "node",
                style: {
                    "background-color": Colors.node_bg_color,
                    "label": "data(id)",
                    "text-valign": "center",
                    "text-halign": "center",
                    "color": "#000000",
                    "font-size": "14px",
                },
            },
            {
                selector: "edge",
                style: {
                    "width": 3,
                    "line-color": Colors.edge_bg_color,
                    "target-arrow-shape": "none", //Will be changed to triangle in case of directed
                    "target-arrow-color": "white",
                    "curve-style": "bezier",
                    "label": "data(weight)",
                    "text-rotation": "autorotate",
                    "font-size": "18px",
                    "color": "#ffffff"
                },
            },
        ],
        layout: {
            name: "grid", // Default layout
        },
    });


    
    

    // Function to add a node where user clicks
    function addNode(event) {
        const pos = event.position;
        graphEditor.add({
            group: "nodes",
            data: { id: `${nodeCount}` },
            position: { x: pos.x, y: pos.y },
        });
        nodeCount++;
        //console.log(graphEditor.nodes());
        updateAdjacencyMatrix();
    }

    // Function to add an edge between two nodes
    let selectedNode = null;
    function addEdge(event) {
        const targetNode = event.target;

        if (selectedNode === null) {
            selectedNode = targetNode;
            selectedNode.style("background-color",Colors.temp_selected_node_bg_color);

        } else {
            graphEditor.add({
                group: "edges",
                data: {
                    id: `${selectedNode.id()}-${targetNode.id()}`,
                    source: selectedNode.id(),
                    target: targetNode.id(),
                    weight: 1,
                },
            });
            selectedNode.style("background-color", Colors.node_bg_color); // Reset color of temp node
            selectedNode = null;
        }
        //console.log(graphEditor.edges());
        updateAdjacencyMatrix();
    }

    // Function to toggle directed/undirected graph
    function setDirectedMode(directedMode=false) {
        isDirected = directedMode;
        graphEditor.style().selector("edge").style({
            "target-arrow-shape": isDirected ? "triangle" : "none",
        }).update();
        updateAdjacencyMatrix();
    }

    // Function to remove selected elements (nodes/edges)
    function deleteElement(event) {
        event.target.remove();
        updateAdjacencyMatrix();
    }

    // Event Listeners
    graphEditor.on("tap", "node", addEdge); // Click node to create an edge
    graphEditor.on("tap", function (event) {
        if (event.target === graphEditor) addNode(event); // Click background to create node
    });
    graphEditor.on("cxttap", "node, edge", deleteElement); // Right-click to delete

    // Expose functions globally (for UI buttons)
    //window.toggleDirectedMode = toggleDirectedMode;
    document.getElementById("directed-mode").addEventListener("change", function(event) {
        event.target.checked ? setDirectedMode(true) : setDirectedMode(false);
        console.log("Checkbox changed:", event.target.checked ? "Directed" : "Undirected");
    });
   
    
    // Function to update the adjacency matrix
function updateAdjacencyMatrix() {
    // Clear previous matrix
    adjacencyMatrix = [];
    const nodes = graphEditor.nodes();

    // Initialize the adjacency matrix with 0s
    nodes.forEach(() => adjacencyMatrix.push(Array(nodes.length).fill(0)));

    // Update matrix based on edges
    graphEditor.edges().forEach((edge) => {
        const sourceIdx = nodes.findIndex(node => node.id() === edge.data('source'));
        const targetIdx = nodes.findIndex(node => node.id() === edge.data('target'));

        if (sourceIdx !== -1 && targetIdx !== -1) {
            adjacencyMatrix[sourceIdx][targetIdx] = 1;
            if (!isDirected) {
                adjacencyMatrix[targetIdx][sourceIdx] = 1; // For undirected graphs, make it symmetric
            }
        }
    });
    updateAdjacencyMatrixUI()
    // Log the adjacency matrix
    //console.log("Adjacency Matrix: \n", adjacencyMatrix);
}



//Random Graph Generator
function generateRandomGraph(
    numNodes=Math.floor(Math.random()*10)+5, 
    numEdges=Math.floor(Math.random()*(numNodes*(numNodes-1)/2))+1
    ){
    
    //By dedault randome no. of nodes between 5 and 15 and ndom number of edges (between 1 and max possible edges)

    // Create nodes at random positions
    for (let i = 0; i < numNodes; i++) {
        const xPos = Math.random() * graphEditor.container().clientWidth; // Random x position
        const yPos = Math.random() * graphEditor.container().clientHeight; // Random y position
        graphEditor.add({ group: 'nodes', data: { id: `${i}` }, position: { x: xPos, y: yPos },});
        nodeCount++;
    }

    // Create random edges between nodes
    let edgeCount = 0;
    while (edgeCount < numEdges) {
        const sourceNode = graphEditor.nodes()[Math.floor(Math.random() * numNodes)];
        const targetNode = graphEditor.nodes()[Math.floor(Math.random() * numNodes)];

        if (sourceNode.id() !== targetNode.id() && !graphEditor.getElementById(`${sourceNode.id()}-${targetNode.id()}`).length) {
            graphEditor.add({
                group: 'edges',
                data: {
                    id: `${sourceNode.id()}-${targetNode.id()}`,
                    source: sourceNode.id(),
                    target: targetNode.id(),
                    weight: Math.floor(Math.random() * 10) + 1, // Random edge weight
                },
            });
            edgeCount++;
        }
    }

    updateAdjacencyMatrix();
    resetResizerPositions();
}

generateRandomGraph(100, 100);


const onVisited = (node, parent) => {
    const all_nodes = graphEditor.nodes(); 
    const all_edges = graphEditor.edges(); 
    
    // Change the color of the visited node to lime
    all_nodes[node].style('background-color', 'lime');
    
    // If the parent is not -1 (i.e., it's not the starting node), highlight the edge
    if (parent !== -1) {
        // In an undirected graph, we need to check both directions: parent->node and node->parent
        const edgeId1 = `${parent}-${node}`; // edge from parent to node
        const edgeId2 = `${node}-${parent}`; // edge from node to parent
        
        // Try to find the edge from either direction
        const edge = all_edges.filter(e => e.id() === edgeId1 || e.id() === edgeId2)[0];
        
        // Change the edge color to aqua if found
        if (edge) {
            edge.style('line-color', 'aqua');
        }
    }
    
    console.log(`Node ${node} visited. from edge `, parent, "---", node);
};

const onRevisited = (node, parent) => {
    console.log(`Node ${node} revisited. from edge `, parent, "---",node);
}
const onExpanded = (node, parent) =>{
    console.log(`Node ${node} expanded. from edge `, parent, "---",node);
}
const currGraph = new Graph(adjacencyMatrix, mode="undiected", onVisited, onRevisited, onExpanded);
//currGraph.BFS(0);
currGraph.DFS(0);

});
