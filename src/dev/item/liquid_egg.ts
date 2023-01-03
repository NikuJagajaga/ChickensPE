class ItemLiquidEgg extends ItemCommon implements ItemBehavior {

    private liquidTile: number;

    constructor(stringID: string, name: string, liquidTile: number){
        super(stringID, name, stringID);
        this.setMaxStack(16);
        this.liquidTile = liquidTile;
        Item.addCreativeGroup("liquid_egg", "Liquid Eggs", [this.id]);
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, playerUid: number): void {
        const player = new PlayerEntity(playerUid);
        const region = WorldRegion.getForActor(playerUid);
        let place: Vector;
        if (World.canTileBeReplaced(block.id, block.data)){
            place = coords;
        }
        else{
            const block2 = region.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
            if (World.canTileBeReplaced(block2.id, block2.data)){
                place = coords.relative;
            }
            return;
        }
        region.setBlock(place, this.liquidTile, 0);
        player.decreaseCarriedItem();
    }

}


ItemRegistry.registerItem(new ItemLiquidEgg("liquid_egg_water", "Water Egg", VanillaBlockID.water));
ItemRegistry.registerItem(new ItemLiquidEgg("liquid_egg_lava", "Lava Egg", VanillaBlockID.lava));