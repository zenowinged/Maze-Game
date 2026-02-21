/**
 * Game Configuration & Global State
 */
const TILE_SIZE = 40;
const ROWS = 15;
const COLS = 20;

const GameState = {
    currentLevel: 0,
    currentLevelData: null, // Stores procedural maps for Level 4+
    behaviorProfile: { totalRetries: 0, avgFirstMoveDelay: 0, totalTimeNearTraps: 0, hastyMoves: 0, cautiousMoves: 0 },
    adaptiveModifiers: { timerBonus: 0, speedMultiplier: 1.0, addSurpriseTraps: false }
};

// Levels 1, 2, and 3 are strictly locked in as you requested.
const LEVEL_DATA = [
    // LEVEL 1: Maintained exactly as you liked it
    {
        map: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1,1,0,1], 
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
            [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1], 
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
            [1,1,1,2,1,1,1,2,1,1,1,2,1,0,1,1,1,2,1,1], 
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,1], 
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
        start: {x: 1, y: 1}, exit: {x: 18, y: 13}, time: 50, baseSpeed: 110,
        traps: [ {x: 7, y: 5, type: 'normal'}, {x: 15, y: 9, type: 'invisible'}, {x: 5, y: 13, type: 'normal'} ]
    },
    // LEVEL 2: Maintained exactly as you liked it
    {
        map: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,2,1,0,1,2,1,0,1,0,1,1,2,1,0,1], 
            [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1], 
            [1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
            [1,0,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,1], 
            [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1], 
            [1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,0,1,1,0,1], 
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
        start: {x: 1, y: 1}, exit: {x: 18, y: 13}, time: 55, baseSpeed: 150,
        traps: [ {x: 8, y: 7, type: 'normal'}, {x: 12, y: 11, type: 'invisible'}, {x: 8, y: 13, type: 'normal'} ]
    },
    // LEVEL 3: Tight Gauntlet with new traps
    {
        map: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
            [1,0,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,0,1], 
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
            [1,0,1,1,1,1,1,2,1,1,1,2,1,1,1,1,0,1,0,1], 
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1], 
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1], 
            [1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1], 
            [1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1], 
            [1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1], 
            [1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1], 
            [1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1], 
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1], 
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]  
        ],
        start: {x: 1, y: 1}, exit: {x: 12, y: 9}, time: 55, baseSpeed: 110,
        traps: [ 
            {x: 10, y: 1, type: 'static_invisible'}, 
            {x: 14, y: 4, type: 'normal'},          
            {x: 6, y: 6, type: 'static_invisible'},  
            {x: 5, y: 13, type: 'decoy'}             
        ]
    }
];

/**
 * Procedural Maze Generator for Level 4+
 */
/**
 * Procedural Maze Generator for Level 4+
 */
function generateProceduralMaze(levelIndex) {
    let cols = 19; 
    let map = Array(ROWS).fill(0).map(() => Array(COLS).fill(1)); 

    // Carve initial paths via Depth First Search
    let stack = [{x: 1, y: 1}];
    map[1][1] = 0; 
    const dirs = [[0, 2], [2, 0], [0, -2], [-2, 0]];

    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        let unvisited = [];

        for (let d of dirs) {
            let nx = current.x + d[1], ny = current.y + d[0];
            if (ny > 0 && ny < ROWS - 1 && nx > 0 && nx < cols - 1 && map[ny][nx] === 1) {
                unvisited.push({x: nx, y: ny, dx: d[1]/2, dy: d[0]/2});
            }
        }

        if (unvisited.length > 0) {
            let next = unvisited[Math.floor(Math.random() * unvisited.length)];
            map[next.y][next.x] = 0; 
            map[current.y + next.dy][current.x + next.dx] = 0; 
            stack.push(next);
        } else {
            stack.pop();
        }
    }

    // Find the furthest point for the Exit
    let exit = {x: 1, y: 1}, maxDist = 0;
    let queue = [{x: 1, y: 1, dist: 0}];
    let visited = Array(ROWS).fill(0).map(() => Array(COLS).fill(false));
    visited[1][1] = true;

    while(queue.length > 0) {
        let curr = queue.shift();
        if (curr.dist > maxDist) { maxDist = curr.dist; exit = {x: curr.x, y: curr.y}; }
        const stepDirs = [[0,1], [1,0], [0,-1], [-1,0]];
        for (let d of stepDirs) {
            let nx = curr.x + d[1], ny = curr.y + d[0];
            if (ny > 0 && ny < ROWS - 1 && nx > 0 && nx < cols - 1 && map[ny][nx] === 0 && !visited[ny][nx]) {
                visited[ny][nx] = true;
                queue.push({x: nx, y: ny, dist: curr.dist + 1});
            }
        }
    }

    // --- DEAD-END PRUNER ---
    let pruned = true;
    while (pruned) {
        pruned = false;
        for (let r = 1; r < ROWS - 1; r++) {
            for (let c = 1; c < cols - 1; c++) {
                if (map[r][c] === 0 && !(c === 1 && r === 1) && !(c === exit.x && r === exit.y)) {
                    let walls = 0;
                    if (map[r-1][c] >= 1) walls++;
                    if (map[r+1][c] >= 1) walls++;
                    if (map[r][c-1] >= 1) walls++;
                    if (map[r][c+1] >= 1) walls++;
                    
                    if (walls >= 3) { 
                        map[r][c] = 1; 
                        pruned = true;
                    }
                }
            }
        }
    }

    // Add Hidden Safe Zones (Increased to 40% so you can always dodge moving traps)
    for (let r = 1; r < ROWS - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (map[r][c] === 0) {
                let isHoriz = (map[r][c-1] === 0 && map[r][c+1] === 0 && map[r-1][c] === 1 && map[r+1][c] === 1);
                let isVert = (map[r-1][c] === 0 && map[r+1][c] === 0 && map[r][c-1] === 1 && map[r][c+1] === 1);
                
                if (isHoriz && Math.random() < 0.40) {
                    if (Math.random() < 0.5) map[r-1][c] = 2;
                    else map[r+1][c] = 2;
                } else if (isVert && Math.random() < 0.40) {
                    if (Math.random() < 0.5) map[r][c-1] = 2;
                    else map[r][c+1] = 2;
                }
            }
        }
    }

    // Randomize Traps
    let traps = [];
    let numTraps = 4 + (levelIndex - 3) * 2; 
    let validSpots = [];
    
    for (let r = 1; r < ROWS - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (map[r][c] === 0 && (c !== 1 || r !== 1) && (c !== exit.x || r !== exit.y)) {
                if (Math.abs(c-1) + Math.abs(r-1) >= 8) validSpots.push({x: c, y: r});
            }
        }
    }
    
    validSpots.sort(() => Math.random() - 0.5); 
    for(let i = 0; i < Math.min(numTraps, validSpots.length); i++) {
        let typeRoll = Math.random();
        let type = 'normal';
        
        // Swapped static_invisible for decoy so paths aren't permanently bricked
        if (typeRoll > 0.8) type = 'decoy'; 
        else if (typeRoll > 0.5) type = 'invisible';   
        
        traps.push({x: validSpots[i].x, y: validSpots[i].y, type: type});
    }

    return {
        map: map,
        start: {x: 1, y: 1},
        exit: exit,
        time: 55 + ((levelIndex - 3) * 15),
        baseSpeed: 110 + ((levelIndex - 3) * 20),
        traps: traps
    };
}


class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    create() {
        this.add.text(400, 250, 'PSYCHOLOGICAL MAZE', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 320, 'Press SPACE to Start', { fontSize: '20px', fill: '#aaa' }).setOrigin(0.5);
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    create() {
        // Strict logic to ensure Levels 1, 2, 3 use your requested maps
        if (GameState.currentLevel < LEVEL_DATA.length) {
            this.levelData = LEVEL_DATA[GameState.currentLevel];
            GameState.currentLevelData = null; // Reset procedural tracker
        } else {
            // Level 4+ is procedural
            if (!GameState.currentLevelData) {
                GameState.currentLevelData = generateProceduralMaze(GameState.currentLevel);
            }
            this.levelData = GameState.currentLevelData;
        }

        this.cameras.main.setBackgroundColor('#0a0a0a');
        this.stats = { startTime: this.time.now, firstMoveMade: false, firstMoveTime: 0, lastMoveTime: 0, moveIntervals: [], retries: 0, timeNearTraps: 0 };

        this.activeTrapsData = JSON.parse(JSON.stringify(this.levelData.traps));

        // Inject Surprise traps if adaptive profile demands it
        if (GameState.adaptiveModifiers.addSurpriseTraps) {
            let placed = false;
            for (let r = ROWS - 2; r >= 1; r--) {
                for (let c = 10; c < COLS - 1; c++) {
                    if (this.levelData.map[r][c] === 0) {
                        this.activeTrapsData.push({ x: c, y: r, type: 'surprise' });
                        placed = true;
                        break;
                    }
                }
                if (placed) break;
            }
        }

        this.timeLeft = this.levelData.time + GameState.adaptiveModifiers.timerBonus;
        this.currentTrapSpeed = this.levelData.baseSpeed * GameState.adaptiveModifiers.speedMultiplier;

        this.walls = this.physics.add.staticGroup();
        this.fakeWalls = this.add.group(); 
        this.traps = this.physics.add.group();

        this.buildMaze();
        this.setupPlayer();
        this.setupTraps();
        this.setupUI();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.tickTimer, callbackScope: this, loop: true });
    }

    buildMaze() {
        const map = this.levelData.map;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let x = c * TILE_SIZE + (TILE_SIZE / 2);
                let y = r * TILE_SIZE + (TILE_SIZE / 2);

                if (map[r][c] === 1) {
                    this.walls.add(this.add.rectangle(x, y, TILE_SIZE, TILE_SIZE, 0x444444));
                } else if (map[r][c] === 2) {
                    this.fakeWalls.add(this.add.rectangle(x, y, TILE_SIZE, TILE_SIZE, 0x444444));
                } else if (c === this.levelData.exit.x && r === this.levelData.exit.y) {
                    this.exit = this.add.rectangle(x, y, TILE_SIZE, TILE_SIZE, 0x00ff00);
                    this.physics.add.existing(this.exit, true); 
                }
            }
        }
    }

    setupPlayer() {
        let startX = this.levelData.start.x * TILE_SIZE + (TILE_SIZE / 2);
        let startY = this.levelData.start.y * TILE_SIZE + (TILE_SIZE / 2);
        
        this.player = this.add.rectangle(startX, startY, TILE_SIZE * 0.7, TILE_SIZE * 0.7, 0x0088ff);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.walls); 
        this.physics.add.overlap(this.player, this.exit, this.reachExit, null, this);
    }

    setupTraps() {
        this.activeTrapsData.forEach(tData => {
            let x = tData.x * TILE_SIZE + (TILE_SIZE / 2);
            let y = tData.y * TILE_SIZE + (TILE_SIZE / 2);
            let trap = this.add.rectangle(x, y, TILE_SIZE * 0.8, TILE_SIZE * 0.8, 0xff0000);
            
            this.traps.add(trap);
            trap.trapType = tData.type;

            if (tData.type === 'static_invisible') {
                trap.alpha = 0; 
            } else if (tData.type === 'decoy') {
                trap.alpha = 1;
                trap.revealed = false;
            } else if (tData.type === 'surprise') {
                trap.alpha = 0;
                trap.triggered = false;
                trap.body.setCollideWorldBounds(true);
            } else {
                trap.body.setBounce(1);
                trap.body.setCollideWorldBounds(true);
                if (tData.type === 'invisible') trap.alpha = 0;
                
                let randomDirX = Math.random() > 0.5 ? 1 : -1;
                let randomDirY = Math.random() > 0.5 ? 1 : -1;
                if (Math.random() > 0.5) trap.body.setVelocityX(randomDirX * this.currentTrapSpeed);
                else trap.body.setVelocityY(randomDirY * this.currentTrapSpeed);
            }
        });

        this.physics.add.collider(this.traps, this.walls);
    }

    setupUI() {
        this.uiText = this.add.text(20, 20, `Time: ${this.timeLeft} | Adaptations: ${this.stats.retries}`, { fontSize: '20px', fill: '#fff' });
        this.adaptText = this.add.text(400, 300, '', { fontSize: '24px', fill: '#ffaa00', fontStyle: 'bold' }).setOrigin(0.5);
        this.adaptText.setAlpha(0);
    }

    tickTimer() {
        this.timeLeft--;
        this.uiText.setText(`Time: ${this.timeLeft} | Adaptations: ${this.stats.retries}`);
        if (this.timeLeft <= 0) this.handleReset(); 
    }

    update(time, delta) {
        this.handleMovement(time);
        this.processEnvironment(delta);
    }

    handleMovement(time) {
        const speed = 150;
        this.player.body.setVelocity(0);

        let moved = false;
        if (this.cursors.left.isDown) { this.player.body.setVelocityX(-speed); moved = true; }
        else if (this.cursors.right.isDown) { this.player.body.setVelocityX(speed); moved = true; }
        if (this.cursors.up.isDown) { this.player.body.setVelocityY(-speed); moved = true; }
        else if (this.cursors.down.isDown) { this.player.body.setVelocityY(speed); moved = true; }

        if (moved) {
            if (!this.stats.firstMoveMade) {
                this.stats.firstMoveMade = true;
                this.stats.firstMoveTime = time - this.stats.startTime;
            }
            if (this.stats.lastMoveTime > 0 && time - this.stats.lastMoveTime > 100) {
                this.stats.moveIntervals.push(time - this.stats.lastMoveTime);
            }
            this.stats.lastMoveTime = time;
        }
    }

    processEnvironment(delta) {
        this.traps.getChildren().forEach(trap => {
            let dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, trap.x, trap.y);
            
            if (dist < 100) this.stats.timeNearTraps += delta;

            if (trap.trapType === 'invisible' || trap.trapType === 'static_invisible') {
                trap.alpha = dist < 120 ? 1 : 0;
            }

            if (trap.trapType === 'surprise' && !trap.triggered && dist < 150) {
                trap.triggered = true;
                trap.alpha = 1;
                trap.body.setVelocityY(this.currentTrapSpeed * 1.5); 
            }
            
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), trap.getBounds())) {
                if (trap.trapType === 'decoy') {
                    if (!trap.revealed) {
                        trap.revealed = true;
                        trap.fillColor = 0x555555; 
                        trap.setAlpha(0.6);        
                    }
                } else {
                    this.handleReset();
                }
            }
        });

        this.fakeWalls.getChildren().forEach(fw => {
            let dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, fw.x, fw.y);
            fw.setAlpha(dist < TILE_SIZE * 1.3 ? 0.2 : 1);
        });
    }

    handleReset() {
        this.stats.retries++;
        this.cameras.main.flash(300, 255, 0, 0);

        let deathGridX = Math.floor(this.player.x / TILE_SIZE);
        let deathGridY = Math.floor(this.player.y / TILE_SIZE);
        
        if (!(deathGridX === this.levelData.start.x && deathGridY === this.levelData.start.y)) {
            let tileHasTrap = this.activeTrapsData.some(t => t.x === deathGridX && t.y === deathGridY);
            if (!tileHasTrap && this.stats.retries <= 10) {
                this.activeTrapsData.push({ x: deathGridX, y: deathGridY, type: 'decoy' });
            }
        }

        this.currentTrapSpeed = Phaser.Math.Between(this.levelData.baseSpeed * 0.8, this.levelData.baseSpeed * 1.3);
        this.traps.clear(true, true);
        this.setupTraps();

        let startX = this.levelData.start.x * TILE_SIZE + (TILE_SIZE / 2);
        let startY = this.levelData.start.y * TILE_SIZE + (TILE_SIZE / 2);
        this.player.setPosition(startX, startY);
        
        this.timeLeft = this.levelData.time + GameState.adaptiveModifiers.timerBonus + Phaser.Math.Between(-2, 4);
        this.uiText.setText(`Time: ${this.timeLeft} | Adaptations: ${this.stats.retries}`);

        this.adaptText.setText("THE MAZE REMEMBERS.");
        this.adaptText.setAlpha(1);
        this.tweens.add({ targets: this.adaptText, alpha: 0, duration: 2500, ease: 'Power2' });
    }

    reachExit() {
        this.timerEvent.remove();

        let avgMoveDelay = 0;
        if (this.stats.moveIntervals.length > 0) {
            let sum = this.stats.moveIntervals.reduce((a, b) => a + b, 0);
            avgMoveDelay = sum / this.stats.moveIntervals.length;
        }

        GameState.behaviorProfile.totalRetries += this.stats.retries;
        GameState.behaviorProfile.totalTimeNearTraps += this.stats.timeNearTraps;
        
        if (this.stats.firstMoveTime < 500 && avgMoveDelay < 200) GameState.behaviorProfile.hastyMoves++;
        else if (this.stats.firstMoveTime > 2000 || this.stats.timeNearTraps > 5000) GameState.behaviorProfile.cautiousMoves++;

        if (this.stats.retries > 3) {
            GameState.adaptiveModifiers.timerBonus += 10;
            GameState.adaptiveModifiers.speedMultiplier *= 0.8;
        } else if (this.stats.retries === 0) {
            GameState.adaptiveModifiers.speedMultiplier *= 1.2;
        }

        this.scene.start('VictoryScene', { levelStats: this.stats });
    }
}

class VictoryScene extends Phaser.Scene {
    constructor() { super('VictoryScene'); }

    init(data) { this.levelStats = data.levelStats; }

    create() {
        let isCheckpoint = ((GameState.currentLevel + 1) % 3 === 0);
        this.add.text(400, 100, isCheckpoint ? 'PHASE CONCLUDED' : 'LEVEL COMPLETE', { fontSize: '32px', fill: '#0f0' }).setOrigin(0.5);

        let statsStr = `Behavioral Metrics:\n- First Move Delay: ${(this.levelStats.firstMoveTime / 1000).toFixed(2)}s\n- Adaptations Triggered: ${this.levelStats.retries}\n- Time in Danger Zone: ${(this.levelStats.timeNearTraps / 1000).toFixed(2)}s`;
        this.add.text(400, 220, statsStr, { fontSize: '18px', fill: '#aaa', align: 'center' }).setOrigin(0.5);

        if (!isCheckpoint) {
            this.add.text(400, 450, 'Press SPACE to proceed deeper', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
            this.input.keyboard.once('keydown-SPACE', () => { 
                GameState.currentLevel++; 
                this.scene.start('GameScene'); 
            });
        } else {
            this.add.text(400, 400, 'Analyzing your behavioral profile...', { fontSize: '18px', fill: '#ff0' }).setOrigin(0.5);
            this.analyzeAndSpeak();
            this.add.text(400, 500, 'Press SPACE to proceed to Next Phase', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
            this.input.keyboard.once('keydown-SPACE', () => {
                GameState.currentLevel++;
                this.scene.start('GameScene');
            });
        }
    }

    analyzeAndSpeak() {
        let profile = GameState.behaviorProfile;
        let voiceLine = "The maze reveals your nature. ";

        if (profile.hastyMoves > profile.cautiousMoves && profile.totalRetries > 3) voiceLine += "You rush toward uncertainty. Recklessness is a fragile shield.";
        else if (profile.cautiousMoves > profile.hastyMoves) voiceLine += "You hesitate before moving. Every step is calculated, yet fear lingers.";
        else if (profile.totalRetries === 0) voiceLine += "Flawless execution. A cold, calculated path devoid of error.";
        else voiceLine += "You adapt through trial and error. A resilient spirit within chaotic walls.";

        if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(voiceLine));
        this.add.text(400, 350, `"${voiceLine}"`, { fontSize: '16px', fill: '#0cf', align: 'center', wordWrap: { width: 600 } }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO, width: 800, height: 600, parent: 'game-container',
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: [BootScene, GameScene, VictoryScene]
};
const game = new Phaser.Game(config);