// Menu Toggle
// document.getElementById("menu-btn").addEventListener("click", ()=> {
//     document.getElementById("menu-dropdown").classList.toggle("hidden");
// });

// // Algorithm Submenu Toggle
// document.querySelector("#menu-dropdown li").addEventListener("click", function() {
//     document.getElementById("algo-submenu").classList.toggle("hidden");
// });

// Dragging Functionality
let isDraggingHorizontal = false;
let isDraggingVertical = false;
let startX, startWidth;
let startY, startHeight;

function makeDraggableHorizontal(resizer, leftPanel, rightPanel) {
    resizer.addEventListener("mousedown", function (e) {
        isDraggingHorizontal = true;
        startX = e.clientX;
        startWidth = leftPanel.offsetWidth;
        document.body.style.cursor = "col-resize"; // or "row-resize" for vertical
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDraggingHorizontal) return;

        const minWidth = 200; // Minimum width of left panel
        const maxWidth = window.innerWidth - minWidth; // Prevent right panel from disappearing

        let newWidth = startWidth + (e.clientX - startX);
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;

        leftPanel.style.flex = `0 0 ${newWidth}px`;
        rightPanel.style.flex = `1 1 auto`;
        document.body.style.cursor = "default";

        console.log("NewWidth: ",newWidth, ", StartWidth: ", startWidth);
    });

    document.addEventListener("mouseup", function () {
        isDraggingHorizontal = false;
    });
    
}


function makeDraggableVertical(resizer, topPanels, bottomPanels) {
    resizer.addEventListener("mousedown", function (e) {
        isDraggingVertical = true;
        startY = e.clientY;
        startHeight = topPanels.offsetHeight;
        document.body.style.cursor = "col-resize"; // or "row-resize" for vertical
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDraggingVertical) return;

        const minHeight = 150;  // Minimum height for top panel
        const maxHeight = window.innerHeight - minHeight;  // Prevent bottom panel from disappearing

        let newHeight = startHeight + (e.clientY - startY);
        if (newHeight < minHeight) newHeight = minHeight;
        if (newHeight > maxHeight) newHeight = maxHeight;

        topPanels.style.flex = `0 0 ${newHeight}px`;
        bottomPanels.style.flex = `1 1 auto`;
        document.body.style.cursor = "default";

        console.log("NewHeight: ",newHeight, ", startHeight: ",startHeight, "NodeCount", nodeCount);
    });

    document.addEventListener("mouseup", function () {
        isDraggingVertical = false;
    });
    
}
// Apply dragging to the middle and bottom resizers
makeDraggableHorizontal(
    document.getElementById("resize-handle"),
    document.getElementById("graph-editor"),
    document.getElementById("algo-editor")
);

makeDraggableHorizontal(
    document.getElementById("resize-handle-bottom"),
    document.getElementById("adjacency-matrix"),
    document.getElementById("log-panel")
);

makeDraggableVertical(
    document.getElementById("resize-handle-vertical"),
    document.getElementById("top-panels"),
    document.getElementById("bottom-panels")
);


function resetResizerPositions() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Set default proportions (adjust as needed)
    const leftPanelWidth = windowWidth * 0.75;  // 30% of the window width
    const topPanelHeight = windowHeight * 0.65; // 40% of the window height
    const bottomPanelHeight = windowHeight * 0.25; // 60% of the window height

    // Apply new sizes
    document.getElementById("graph-editor").style.flex = `0 0 ${leftPanelWidth}px`;
    document.getElementById("algo-editor").style.flex = `1 1 auto`;

    document.getElementById("top-panels").style.flex = `0 0 ${topPanelHeight}px`;
    document.getElementById("bottom-panels").style.flex = `0 0 ${bottomPanelHeight}px`;

    document.getElementById("adjacency-matrix").style.flex = `0 0 ${leftPanelWidth}px`;
    document.getElementById("log-panel").style.flex = `1 1 auto`;
}

// Call the function on window resize to keep proportions consistent
window.addEventListener("resize", resetResizerPositions);

// Call on page load to set initial positions
resetResizerPositions();







