class Inventory {
    constructor() {
        this.items = {};
    }

    addItem(item, quantity = 1) {
        this.items[item] = (this.items[item] || 0) + quantity;
    }

    removeItem(item, quantity = 1) {
        if (this.items[item]) {
            this.items[item] -= quantity;
            if (this.items[item] <= 0) delete this.items[item];
        }
    }

    hasItem(item, quantity = 1) {
        return this.items[item] >= quantity;
    }
}

const recipes = {
    'wooden_pickaxe': { wood: 3 },
    'stone_pickaxe': { wood: 2, stone: 3 }
};

function craftItem(inventory, item) {
    let recipe = recipes[item];

    if (!recipe) return console.log("Invalid recipe");

    for (let material in recipe) {
        if (!inventory.hasItem(material, recipe[material])) {
            return console.log("Not enough materials!");
        }
    }

    for (let material in recipe) {
        inventory.removeItem(material, recipe[material]);
    }

    inventory.addItem(item);
    console.log(`${item} crafted!`);
}
