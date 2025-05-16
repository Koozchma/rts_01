document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const goldDisplay = document.getElementById('goldDisplay');
    const workerDisplay = document.getElementById('workerDisplay');
    const housingDisplay = document.getElementById('housingDisplay');
    const scienceDisplay = document.getElementById('scienceDisplay');
    const militaryDisplay = document.getElementById('militaryDisplay');

    const buyWorkerBtn = document.getElementById('buyWorkerBtn');
    const buildHouseBtn = document.getElementById('buildHouseBtn');
    const upgradeWorkerBtn = document.getElementById('upgradeWorkerBtn');
    const buildScienceLabBtn = document.getElementById('buildScienceLabBtn');
    const buildBarracksBtn = document.getElementById('buildBarracksBtn');
    const trainTroopBtn = document.getElementById('trainTroopBtn');

    const workerCostDisplay = document.getElementById('workerCostDisplay');
    const houseCostDisplay = document.getElementById('houseCostDisplay');
    const houseCapacityDisplay = document.getElementById('houseCapacityDisplay');
    const workerUpgradeCostDisplay = document.getElementById('workerUpgradeCostDisplay');
    const scienceLabCostDisplay = document.getElementById('scienceLabCostDisplay');
    const barracksCostDisplay = document.getElementById('barracksCostDisplay');
    const troopCostDisplay = document.getElementById('troopCostDisplay');

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // --- Game State Variables ---
    let gold = 50;
    let workers = 0;
    let housingCapacity = 5;
    let sciencePoints = 0;
    let militaryStrength = 0;

    let workerGoldPerSecondBase = 1;
    let workerEfficiencyMultiplier = 1; // Upgradable

    let scienceLabs = 0;
    let sciencePointsPerSecondBase = 1; // Per lab

    let barracks = 0;
    let troops = 0;

    // --- Game Configuration (Costs & Values) ---
    const config = {
        workerCost: 10,
        houseCost: 50,
        houseCapacityIncrease: 5,
        workerUpgradeCost: 100,
        workerUpgradeMultiplierBonus: 0.5, // Adds to workerEfficiencyMultiplier
        scienceLabCost: 200,
        barracksCost: 150,
        troopCost: 25,
        troopStrength: 5,
        initialCanvasWidth: 600,
        initialCanvasHeight: 400,
        buildingVisualSize: 50, // For drawing on canvas
        buildingPadding: 10
    };

    // --- Canvas Setup ---
    canvas.width = config.initialCanvasWidth;
    canvas.height = config.initialCanvasHeight;

    // --- Game Logic Functions ---

    function updateDisplays() {
        goldDisplay.textContent = Math.floor(gold);
        workerDisplay.textContent = workers;
        housingDisplay.textContent = housingCapacity;
        scienceDisplay.textContent = sciencePoints;
        militaryDisplay.textContent = militaryStrength;

        workerCostDisplay.textContent = config.workerCost;
        houseCostDisplay.textContent = config.houseCost;
        houseCapacityDisplay.textContent = config.houseCapacityIncrease;
        workerUpgradeCostDisplay.textContent = config.workerUpgradeCost;
        scienceLabCostDisplay.textContent = config.scienceLabCost;
        barracksCostDisplay.textContent = config.barracksCost;
        troopCostDisplay.textContent = config.troopCost;

        // Enable/disable buttons based on resources/conditions
        buyWorkerBtn.disabled = gold < config.workerCost || workers >= housingCapacity;
        buildHouseBtn.disabled = gold < config.houseCost;
        upgradeWorkerBtn.disabled = gold < config.workerUpgradeCost || workers === 0; // Need workers to upgrade
        buildScienceLabBtn.disabled = gold < config.scienceLabCost;
        buildBarracksBtn.disabled = gold < config.barracksCost;
        trainTroopBtn.disabled = gold < config.troopCost || barracks === 0;
    }

    function buyWorker() {
        if (gold >= config.workerCost && workers < housingCapacity) {
            gold -= config.workerCost;
            workers++;
            // Potentially increase worker cost dynamically here if desired
            // config.workerCost = Math.ceil(config.workerCost * 1.1);
            updateDisplays();
        }
    }

    function buildHouse() {
        if (gold >= config.houseCost) {
            gold -= config.houseCost;
            housingCapacity += config.houseCapacityIncrease;
            // Potentially increase house cost
            // config.houseCost = Math.ceil(config.houseCost * 1.15);
            updateDisplays();
        }
    }

    function upgradeWorkerEfficiency() {
        if (gold >= config.workerUpgradeCost && workers > 0) {
            gold -= config.workerUpgradeCost;
            workerEfficiencyMultiplier += config.workerUpgradeMultiplierBonus;
            config.workerUpgradeCost = Math.ceil(config.workerUpgradeCost * 1.5); // Increase cost for next upgrade
            updateDisplays();
        }
    }

    function buildScienceLab() {
        if (gold >= config.scienceLabCost) {
            gold -= config.scienceLabCost;
            scienceLabs++;
            // Potentially increase cost
            // config.scienceLabCost = Math.ceil(config.scienceLabCost * 1.2);
            updateDisplays();
        }
    }

    function buildBarracks() {
        if (gold >= config.barracksCost) {
            gold -= config.barracksCost;
            barracks++;
            // Potentially increase cost
            // config.barracksCost = Math.ceil(config.barracksCost * 1.2);
            updateDisplays();
        }
    }

    function trainTroop() {
        if (gold >= config.troopCost && barracks > 0) {
            gold -= config.troopCost;
            troops++;
            militaryStrength += config.troopStrength;
            // Potentially increase cost
            // config.troopCost = Math.ceil(config.troopCost * 1.05);
            updateDisplays();
        }
    }


    // --- Game Loop ---
    let lastTime = 0;
    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000; // Time in seconds
        lastTime = timestamp;

        // --- Resource Generation ---
        // Gold from workers
        const goldPerSecond = workers * workerGoldPerSecondBase * workerEfficiencyMultiplier;
        gold += goldPerSecond * deltaTime;

        // Science points from labs
        const sciencePerSecond = scienceLabs * sciencePointsPerSecondBase;
        sciencePoints += sciencePerSecond * deltaTime;


        updateDisplays();
        renderCanvas();

        requestAnimationFrame(gameLoop);
    }

    // --- Canvas Rendering ---
    function renderCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Simple visualization of buildings
        let currentX = config.buildingPadding;
        let currentY = config.buildingPadding;

        // Draw Houses (conceptual)
        ctx.fillStyle = 'brown';
        const housesNeeded = Math.ceil(housingCapacity / config.houseCapacityIncrease); // assuming initial housing isn't "built"
        for (let i = 0; i < housesNeeded -1 ; i++) { // -1 because initial capacity is "free"
            ctx.fillRect(currentX, currentY, config.buildingVisualSize, config.buildingVisualSize);
            currentX += config.buildingVisualSize + config.buildingPadding;
            if (currentX + config.buildingVisualSize > canvas.width) {
                currentX = config.buildingPadding;
                currentY += config.buildingVisualSize + config.buildingPadding;
            }
        }

        // Draw Science Labs
        ctx.fillStyle = 'blue';
        for (let i = 0; i < scienceLabs; i++) {
            ctx.fillRect(currentX, currentY, config.buildingVisualSize, config.buildingVisualSize);
            ctx.fillStyle = 'white'; ctx.fillText("S", currentX + 10, currentY + 20); ctx.fillStyle = 'blue'; // Label
            currentX += config.buildingVisualSize + config.buildingPadding;
            if (currentX + config.buildingVisualSize > canvas.width) {
                currentX = config.buildingPadding;
                currentY += config.buildingVisualSize + config.buildingPadding;
            }
        }

        // Draw Barracks
        ctx.fillStyle = 'red';
        for (let i = 0; i < barracks; i++) {
            ctx.fillRect(currentX, currentY, config.buildingVisualSize, config.buildingVisualSize);
            ctx.fillStyle = 'white'; ctx.fillText("B", currentX + 10, currentY + 20); ctx.fillStyle = 'red'; // Label
            currentX += config.buildingVisualSize + config.buildingPadding;
            if (currentX + config.buildingVisualSize > canvas.width) {
                currentX = config.buildingPadding;
                currentY += config.buildingVisualSize + config.buildingPadding;
            }
        }
         // Draw Workers (conceptual) - simple dots or small squares
        ctx.fillStyle = 'yellow';
        let workerX = config.buildingPadding;
        let workerY = canvas.height - config.buildingPadding - 10; // Bottom of canvas
        for(let i = 0; i < workers; i++) {
            ctx.beginPath();
            ctx.arc(workerX + 5, workerY + 5, 5, 0, Math.PI * 2);
            ctx.fill();
            workerX += 12;
             if (workerX + 10 > canvas.width) {
                workerX = config.buildingPadding;
                workerY -= 12;
            }
        }

        // Draw Troops (conceptual)
        ctx.fillStyle = 'orange';
        let troopX = canvas.width - config.buildingPadding - 10; // Right side
        let troopY = config.buildingPadding;
        for(let i = 0; i < troops; i++) {
            ctx.fillRect(troopX, troopY, 10, 10); // Simple squares for troops
            troopY += 12;
            if (troopY + 10 > canvas.height) {
                troopY = config.buildingPadding;
                troopX -= 12;
            }
        }
    }

    // --- Event Listeners ---
    buyWorkerBtn.addEventListener('click', buyWorker);
    buildHouseBtn.addEventListener('click', buildHouse);
    upgradeWorkerBtn.addEventListener('click', upgradeWorkerEfficiency);
    buildScienceLabBtn.addEventListener('click', buildScienceLab);
    buildBarracksBtn.addEventListener('click', buildBarracks);
    trainTroopBtn.addEventListener('click', trainTroop);


    // --- Initialize Game ---
    updateDisplays(); // Set initial UI text
    requestAnimationFrame(gameLoop); // Start the game loop
});
