//For handling algorithms data and the algorithms list menu UI
let algoListMenu = document.getElementById("algoMenu");

// Fetch the algorithm list from JSON
function fetchAlgo() {
    fetch(algoListLocation)
        .then(res => res.json())
        .then(data => {
            algoList = data["algorithms"];
            algorithms = algoList.map(a => a['name']);
            populateAlgoList(); // Populate the list after fetching data
        });
}

// Populate the list of algorithms
function populateAlgoList() {
    algoListMenu.innerHTML = ''; // Clear the list first
    algorithms.forEach(algo => {
        let li = document.createElement('li');
        li.classList.add('px-5', 'py-2', 'hover:bg-gray-700', 'cursor-pointer');
        li.textContent = algo;
        algoListMenu.appendChild(li);
    });
}

// Toggle the visibility of the algorithm menu
function toggleMenu() {
    algoListMenu.classList.toggle('hidden');
}

// Filter the algorithms based on search input
function filterAlgorithms() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const filtered = algorithms.filter(algo => algo.toLowerCase().includes(searchQuery));
    
    // Re-populate the list with filtered results
    algoListMenu.innerHTML = '';
    filtered.forEach(algo => {
        let li = document.createElement('li');
        li.classList.add('px-5', 'py-2', 'hover:bg-gray-700', 'cursor-pointer');
        li.textContent = algo;
        algoListMenu.appendChild(li);
    });
}



// Function to switch between tabs
    function switchTab(tab) {
        // Hide all tabs
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tabContent => {
            tabContent.classList.add('hidden');
        });

        // Show the selected tab
        const selectedTab = document.getElementById(tab);
        selectedTab.classList.remove('hidden');

        // Update active tab styling
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.classList.remove('bg-gray-600');
            button.classList.add('bg-gray-700');
        });

        // Highlight the active tab
        const activeTab = document.getElementById(`${tab}-tab`);
        activeTab.classList.add('bg-gray-600');
        activeTab.classList.remove('bg-gray-700');
    }

    // Set the default active tab
    window.onload = () => {
        // Fetch algorithms when the page loads
        fetchAlgo();
        switchTab('config');
    }