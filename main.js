var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: { default: 'arcade', arcade: { gravity: { y: 300 }, debug: false } },
    scene: { preload: preload, create: create, update: update }
};

var player, cursors, inventory, enemies, world;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.spritesheet('dude', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky');

    // Generate world
    world = generateWorld(50, 30);
    renderWorld(this, world);

    // Player setup
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    // Initialize inventory
    inventory = new Inventory();

    // Spawn enemies
    enemies = this.physics.add.group();
    spawnEnemy(this, 600, 450);
}

function update() {
    handlePlayerMovement(player, cursors);
    updateEnemies(this);
}
