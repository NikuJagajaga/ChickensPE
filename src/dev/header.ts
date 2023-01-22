IMPORT("BlockEngine");
IMPORT("EnhancedRecipes");


const getAddonItemIdentifier = (id: number): string => {
    if(IDRegistry.isVanilla(id)){
        for(let key in VanillaBlockID){
            //@ts-ignore
            if(VanillaBlockID[key] === id){
                return "minecraft:" + key;
            }
        }
        for(let key in VanillaItemID){
            //@ts-ignore
            if(VanillaItemID[key] === id){
                return "minecraft:" + key;
            }
        }
        return;
    }
    const info = IDRegistry.getIdInfo(id);
    if(info){
        return "minecraft:" + info.split(":")[1];
    }
    return "";
}


Callback.addCallback("PostLoaded", () => {
    ChickenEntity.generateAllJson();
});
