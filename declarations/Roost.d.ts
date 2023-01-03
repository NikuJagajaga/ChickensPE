declare namespace RoostAPI {

    export declare class ItemChicken extends ItemCommon implements ItemBehavior {
        static isExists(id: number): boolean;
        readonly identifier: string;
        constructor(stringID: string, name: string, products: (number | Tile | Recipes2.VanillaID)[]);
        onNameOverride(item: ItemInstance, translation: string, name: string): string;
        setEntityIdentifier(identifier: string): ItemChicken;
        getEntityIdentifier(): string;
        setSkin(skin: string): ItemChicken;
        getSkin(): string;
        getProducts(): Tile[];
        getBreedableList(): {
            mate: ItemChicken;
            baby: ItemChicken;
        }[];
        getBabies(mate: ItemChicken): ItemChicken[];
        getRandomBaby(mate: ItemChicken): Nullable<ItemChicken>;
        setParents(parent1: ItemChicken, parent2: ItemChicken): ItemChicken;
        hasParents(): boolean;
        isBabyOf(parent1: ItemChicken, parent2: ItemChicken): boolean;
        getTier(): number;
        getMinLayTime(): number;
        getMaxLayTime(): number;
    }

    export namespace Chicken {
        export const $vanilla: ItemChicken;
    }

}