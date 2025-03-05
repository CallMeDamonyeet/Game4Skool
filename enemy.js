class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dude'); // Temporary sprite, replace later
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setVelocityX(Phaser.Math.Between(-100, 100));
        this.health = 3;
    }

    update(player) {
        if (Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y) < 200) {
            this.scene.physics.moveToObject(this, player, 100);
        }
    }
}

function spawnEnemy(scene, x, y) {
    let enemy = new Enemy(scene, x, y);
    scene.enemies.add(enemy);
}

function updateEnemies(scene) {
    scene.enemies.children.iterate(enemy => {
        enemy.update(scene.player);
    });
}
