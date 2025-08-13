// Bee Maze Game - Square, solvable maze with hidden flower
let maze;
let beeX, beeY;

function generateMaze(size = 15) {
    if (size % 2 === 0) size++;
    let maze = Array.from({length: size}, () => Array(size).fill(1));
    function carve(x, y) {
        const dirs = [
            [0, -2], [0, 2], [-2, 0], [2, 0]
        ];
        for (let i = dirs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
        }
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (ny > 0 && ny < size && nx > 0 && nx < size && maze[ny][nx] === 1) {
                maze[y + dy/2][x + dx/2] = 0;
                maze[ny][nx] = 0;
                carve(nx, ny);
            }
        }
    }
    maze[1][1] = 0;
    carve(1, 1);
    beeX = 1; beeY = 1;
    maze[beeY][beeX] = 'B';
    let farthest = {x: 1, y: 1, dist: 0};
    for (let y = 1; y < size; y += 2) {
        for (let x = 1; x < size; x += 2) {
            if (maze[y][x] === 0) {
                let d = Math.abs(x - beeX) + Math.abs(y - beeY);
                if (d > farthest.dist) {
                    farthest = {x, y, dist: d};
                }
            }
        }
    }
    maze[farthest.y][farthest.x] = 'F';
    return maze;
}

function resetMaze() {
    maze = generateMaze(15); // Square maze, fits well on page
}

function renderMaze() {
    const mazeContainer = document.getElementById('maze');
    mazeContainer.innerHTML = '';
    mazeContainer.style.display = 'grid';
    mazeContainer.style.gridTemplateColumns = 'repeat(15, 32px)';
    mazeContainer.style.gap = '2px';
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (maze[y][x] === 1) tile.classList.add('wall');
            if (maze[y][x] === 0) tile.classList.add('path');
            if (maze[y][x] === 'B') tile.classList.add('bee');
            // Hide flower unless bee is close
            if (maze[y][x] === 'F') {
                const dist = Math.abs(x - beeX) + Math.abs(y - beeY);
                if (dist <= 2) {
                    tile.classList.add('flower');
                } else {
                    tile.classList.add('path'); // Hide flower as path
                }
            }
            mazeContainer.appendChild(tile);
        }
    }
}

function moveBee(e) {
    let newX = beeX, newY = beeY;
    if (e.key === 'ArrowUp') newY--;
    else if (e.key === 'ArrowDown') newY++;
    else if (e.key === 'ArrowLeft') newX--;
    else if (e.key === 'ArrowRight') newX++;
    // Only allow movement to adjacent open cells
    if (Math.abs(newX - beeX) + Math.abs(newY - beeY) !== 1) return;
    if (maze[newY][newX] === 1) return;
    maze[beeY][beeX] = 0;
    beeX = newX; beeY = newY;
    if (maze[beeY][beeX] === 'F') {
        document.getElementById('message').textContent = 'You found the flower! 🐝🌼';
        resetMaze();
        renderMaze();
        return;
    }
    maze[beeY][beeX] = 'B';
    renderMaze();
}

document.addEventListener('keydown', function(e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        moveBee(e);
    }
});

resetMaze();
renderMaze();

            function resetMaze() {
                maze = generateMaze(15); // Square maze, fits well on page
            }

            function renderMaze() {
                const mazeContainer = document.getElementById('maze');
                mazeContainer.innerHTML = '';
                mazeContainer.style.display = 'grid';
                mazeContainer.style.gridTemplateColumns = 'repeat(15, 32px)';
                mazeContainer.style.gap = '2px';
                for (let y = 0; y < maze.length; y++) {
                    for (let x = 0; x < maze[y].length; x++) {
                        const tile = document.createElement('div');
                        tile.classList.add('tile');
                        if (maze[y][x] === 1) tile.classList.add('wall');
                        if (maze[y][x] === 0) tile.classList.add('path');
                        if (maze[y][x] === 'B') tile.classList.add('bee');
                        // Hide flower unless bee is close
                        if (maze[y][x] === 'F') {
                            const dist = Math.abs(x - beeX) + Math.abs(y - beeY);
                            if (dist <= 2) {
                                tile.classList.add('flower');
                            } else {
                                tile.classList.add('path'); // Hide flower as path
                            }
                        }
                        mazeContainer.appendChild(tile);
                    }
                }
            }

            function moveBee(e) {
                let newX = beeX, newY = beeY;
                if (e.key === 'ArrowUp') newY--;
                else if (e.key === 'ArrowDown') newY++;
                else if (e.key === 'ArrowLeft') newX--;
                else if (e.key === 'ArrowRight') newX++;
                // Only allow movement to adjacent open cells
                if (Math.abs(newX - beeX) + Math.abs(newY - beeY) !== 1) return;
                if (maze[newY][newX] === 1) return;
                maze[beeY][beeX] = 0;
                beeX = newX; beeY = newY;
                if (maze[beeY][beeX] === 'F') {
                    document.getElementById('message').textContent = 'You found the flower! 🐝🌼';
                    resetMaze();
                    renderMaze();
                    return;
                }
                maze[beeY][beeX] = 'B';
                renderMaze();
            }

            document.addEventListener('keydown', function(e) {
                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                    e.preventDefault();
                    moveBee(e);
                }
            });

            resetMaze();
            renderMaze();