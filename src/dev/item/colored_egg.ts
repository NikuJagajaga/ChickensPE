class ItemColoredEgg extends ItemThrowable {

    private insideEntity: string;

    constructor(stringID: string, name: string, insideEntity: string){
        super(stringID, name, stringID);
        this.setMaxStack(16);
        this.insideEntity = insideEntity;
        Item.addCreativeGroup("colored_egg", "Colored Eggs", [this.id]);
/*
        const model = ItemModel.newStandalone();
        const mesh = new RenderMesh();

        mesh.setColor(1, 1, 1);
        mesh.setNormal(1, 1, 0);
        mesh.addVertex(0, 1, 1, 0, 0);
        mesh.addVertex(1, 1, 1, 0.5, 0);
        mesh.addVertex(0, 0, 1, 0, 0.5);
        mesh.addVertex(1, 1, 1, 0.5, 0);
        mesh.addVertex(0, 0, 1, 0, 0.5);
        mesh.addVertex(1, 0, 1, 0.5, 0.5);

        model.setUiModel(mesh, "items-opaque/test_item");
        model.setModUiSpriteBitmap(FileTools.ReadImage(__dir__ + "res/items-opaque/test_item.png"));
        model.setSpriteUiRender(true);

        ItemModel.getFor(this.id, 0).setModelOverrideCallback(item => model);
*/
    }

    onProjectileHit(projectile: number, item: ItemInstance, target: Callback.ProjectileHitTarget): void {
        const x = target.coords?.relative.x ?? Math.round(target.x);
        const y = target.coords?.relative.y ?? Math.round(target.y);
        const z = target.coords?.relative.z ?? Math.round(target.z);
        const rand = Math.random() * 256 | 0;
        let chickens = 0;
        if(rand === 0){ // 1/256
            chickens = 4;
        }
        else if(rand < 32){ // 31/256
            chickens = 1;
        }
        for(let i = 0; i < chickens; i++){
            Commands.exec(`/summon ${this.insideEntity} ${x} ${y} ${z} minecraft:entity_born`);
        }
    }

}

ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_black", "Black Egg", "chickens:chicken_dye_black"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_red", "Red Egg", "chickens:chicken_dye_red"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_green", "Green Egg", "chickens:chicken_dye_green"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_brown", "Brown Egg", "chickens:chicken_dye_brown"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_blue", "Blue Egg", "chickens:chicken_dye_blue"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_purple", "Purple Egg", "chickens:chicken_dye_purple"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_cyan", "Cyan Egg", "chickens:chicken_dye_cyan"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_lightgray", "Light Gray Egg", "chickens:chicken_dye_lightgray"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_gray", "Gray Egg", "chickens:chicken_dye_gray"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_pink", "Pink Egg", "chickens:chicken_dye_pink"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_lime", "Lime Egg", "chickens:chicken_dye_lime"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_yellow", "Yellow Egg", "chickens:chicken_dye_yellow"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_lightblue", "Light Blue Egg", "chickens:chicken_dye_lightblue"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_magenta", "Magenta Egg", "chickens:chicken_dye_magenta"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_orange", "Orange Egg", "chickens:chicken_dye_orange"));
ItemRegistry.registerItem(new ItemColoredEgg("colored_egg_white", "White Egg", "chickens:chicken_dye_white"));

Callback.addCallback("PreLoaded", () => {

    Recipes2.addShapeless(ItemID.colored_egg_black, ["egg", "ink_sac"]);
    Recipes2.addShapeless(ItemID.colored_egg_red, ["egg", "red_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_green, ["egg", "green_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_brown, ["egg", "cocoa_beans"]);
    Recipes2.addShapeless(ItemID.colored_egg_blue, ["egg", "lapis_lazuli"]);
    Recipes2.addShapeless(ItemID.colored_egg_purple, ["egg", "purple_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_cyan, ["egg", "cyan_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_lightgray, ["egg", "light_gray_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_gray, ["egg", "gray_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_pink, ["egg", "pink_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_lime, ["egg", "lime_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_yellow, ["egg", "yellow_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_lightblue, ["egg", "light_blue_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_magenta, ["egg", "magenta_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_orange, ["egg", "orange_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_white, ["egg", "bone_meal"]);

    Recipes2.addShapeless(ItemID.colored_egg_black, ["egg", "black_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_brown, ["egg", "brown_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_blue, ["egg", "blue_dye"]);
    Recipes2.addShapeless(ItemID.colored_egg_white, ["egg", "white_dye"]);

});
