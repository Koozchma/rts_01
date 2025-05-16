// Wait for the DOM to be fully loaded before running the game script
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d'); // Canvas 2D rendering context

    // --- Game Configuration ---
    const TILE_SIZE = 32; // Example tile size in pixels
    const MAP_WIDTH_TILES = 25;
    const MAP_HEIGHT_TILES = 20;

    canvas.width = MAP_WIDTH_TILES * TILE_SIZE;
    canvas.height = MAP_HEIGHT_TILES * TILE_SIZE;

    // --- Game State (Very Basic) ---
    let gameObjects = []; // To store units, buildings, etc.
    let selectedObject = null;

    // --- Game Loop ---
    function gameLoop(timestamp) {
        update(); // Update game state
        render(); // Draw the game

        requestAnimationFrame(gameLoop); // Request the next frame
    }

    // --- Update Function ---
    function update() {
        // Placeholder for game logic updates
        // e.g., unit movement, AI, resource collection
    }

    // --- Render Function ---
    function render() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background (e.g., a simple grid for now)
        ctx.strokeStyle = '#222'; // Dark grey for grid lines
        for (let x = 0; x < MAP_WIDTH_TILES; x++) {
            for (let y = 0; y < MAP_HEIGHT_TILES; y++) {
                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }

        // Placeholder for drawing game objects
        // gameObjects.forEach(obj => obj.draw(ctx));

        // Example: Draw a simple square to show something is working
        ctx.fillStyle = 'red';
        ctx.fillRect(TILE_SIZE * 2, TILE_SIZE * 2, TILE_SIZE, TILE_SIZE);

        ctx.fillStyle = 'blue';
        ctx.fillRect(TILE_SIZE * 5, TILE_SIZE * 5, TILE_SIZE * 2, TILE_SIZE);

    }

    // --- Input Handling (Very Basic Example) ---
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const clickedTileX = Math.floor(clickX / TILE_SIZE);
        const clickedTileY = Math.floor(clickY / TILE_SIZE);

        console.log(`Clicked on canvas at screen coordinates: (${clickX}, ${clickY})`);
        console.log(`Clicked on tile: (${clickedTileX}, ${clickedTileY})`);

        // Basic selection logic (placeholder)
        // For now, let's just log what we clicked.
        // Later, you'd check if an object is at these coordinates.
    });


    // --- Start the game ---
    console.log("RTS Game Initializing...");
    requestAnimationFrame(gameLoop); // Start the game loop
});
