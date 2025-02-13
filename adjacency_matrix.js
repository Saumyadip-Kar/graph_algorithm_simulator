const matrixContainer = document.getElementById("matrix-scroll-container");

// Function to update the adjacency matrix UI (a table)
function updateAdjacencyMatrixUI() {
    matrixContainer.innerHTML = ""; // Clear previous table
    const table = document.createElement("table");

    // Create rows and cells for the adjacency matrix
    adjacencyMatrix.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    matrixContainer.appendChild(table);
}
