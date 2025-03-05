// Game configuration
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player, cursors;
var game = new Phaser.Game(config);

// Preload assets (using external URLs for simplicity)
function preload () {
  this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
  this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
  this.load.spritesheet('dude', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}

// Create the game world
function create () {
  // Add background image
  this.add.image(400, 300, 'sky');

  // Create a group of static platforms
  var platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // Create the player sprite with physics
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);

  // Create animations for player movement
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  // Set up keyboard input
  cursors = this.input.keyboard.createCursorKeys();
}

// Update loop for game logic
function update () {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  
  // Allow the player to jump if touching the ground
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
