function generateWorld(width, height) {
    let world = [];
    let noise = new SimplexNoise();

    for (let x = 0; x < width; x++) {
        let terrainHeight = Math.floor(noise.noise2D(x / 10, 0) * 10 + height / 2);
        for (let y = 0; y < height; y++) {
            if (y < terrainHeight) {
                world.push({ x, y, type: 'air' });
            } else if (y === terrainHeight) {
                world.push({ x, y, type: 'grass' });
            } else {
                world.push({ x, y, type: 'dirt' });
            }
        }
    }
    return world;
}

function renderWorld(scene, world) {
    let platforms = scene.physics.add.staticGroup();
    world.forEach(tile => {
        if (tile.type !== 'air') {
            let block = platforms.create(tile.x * 32, tile.y * 32, 'ground');
            block.setScale(0.5).refreshBody();
        }
    });
    return platforms;
}
