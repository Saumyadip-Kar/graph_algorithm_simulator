class Graph {
    // mode is "directed" or "undirected"
    constructor(adjMatrix, mode, onVisited = () => {}, onRevisited = () => {}, onExpanded = () => {}) {
        this.adjMatrix = adjMatrix;
        this.mode = mode;
        this.onVisited = onVisited;
        this.onRevisited = onRevisited;
        this.onExpanded = onExpanded;
        this.visited = new Set(); // Persistent visited set
    }

    async dfsRecursive(node, parent, simulate = true) {
        
        
        if (this.visited.has(node)) {
            //if (simulate) this.onRevisited(node, parent);
            return;
        }

        if(simulate) await delay(TIME_INTERVAL); //Simple timer in case of a simulation
        
        this.visited.add(node);
        if (simulate)  this.onVisited(node, parent);
        
        for (let neighbor = 0; neighbor < this.adjMatrix[node].length; neighbor++) {
            if (this.adjMatrix[node][neighbor] >= 1) {  
                
                if(simulate) await this.dfsRecursive(neighbor, node, simulate);
                else this.dfsRecursive(neighbor, node, simulate);
            }
        }

        //if (simulate) this.onExpanded(node, parent);
    }

    // DFS Traversal
    DFS(startNode){
        this.visited.clear();
        this.dfsRecursive(startNode, -1, true);
        this.visited.clear();
    }

    bfsIterative(startNode, simulate = true) {
        const queue = [[startNode, -1]]; 
        
        while (queue.length > 0) {
            const [node, parent] = queue.shift();

            if (this.visited.has(node)) {
                if (simulate) this.onRevisited(node, parent);
                continue;
            }

            this.visited.add(node);
            if (simulate) this.onVisited(node, parent);

            for (let neighbor = 0; neighbor < this.adjMatrix[node].length; neighbor++) {
                if (this.adjMatrix[node][neighbor] >= 1) {  
                    queue.push([neighbor, node]);
                }
            }

            if (simulate) this.onExpanded(node, parent);
        }
    }

    // BFS Traversal
    BFS(startNode) {
        this.visited.clear();
        this.bfsIterative(startNode, true);
    }
}