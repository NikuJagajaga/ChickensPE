class ItemLiquidEgg extends ItemCommon implements ItemBehavior {

    private liquid: string;

    constructor(stringID: string, name: string, liquid: string){
        super(stringID, name, stringID);
        this.setMaxStack(16);
        this.liquid = liquid;
        Item.addCreativeGroup("liquid_egg", "Liquid Eggs", [this.id]);
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        const region = WorldRegion.getForActor(player);
        let place: Vector;
        if(World.canTileBeReplaced(block.id, block.data)){
            place = coords;
        }
        else{
            const block2 = region.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
            if(!World.canTileBeReplaced(block2.id, block2.data)){
                return;
            }
            place = coords.relative;
        }
        region.setBlock(place, LiquidRegistry.getBlockByLiquid(this.liquid), 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }

}


ItemRegistry.registerItem(new ItemLiquidEgg("liquid_egg_water", "Water Egg", "water"));
ItemRegistry.registerItem(new ItemLiquidEgg("liquid_egg_lava", "Lava Egg", "lava"));
