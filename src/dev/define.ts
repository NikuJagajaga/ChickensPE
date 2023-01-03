namespace RoostAPI.Chicken {

    export const $dye_black = new RoostAPI.ItemChicken("chicken_dye_black", "Ink Black Chicken", ["black_dye", "ink_sac"]);
    export const $dye_red = new RoostAPI.ItemChicken("chicken_dye_red", "Red Chicken", ["red_dye"]);
    export const $dye_green = new RoostAPI.ItemChicken("chicken_dye_green", "Cactus Green Chicken", ["green_dye", "cactus"]);
    export const $dye_brown = new RoostAPI.ItemChicken("chicken_dye_brown", "Cocoa Brown Chicken", ["brown_dye", "cocoa_beans"]);
    export const $dye_blue = new RoostAPI.ItemChicken("chicken_dye_blue", "Lapis Blue Chicken", ["blue_dye", "lapis_lazuli"]);
    export const $dye_purple = new RoostAPI.ItemChicken("chicken_dye_purple", "Purple Chicken", ["purple_dye"]);
    export const $dye_cyan = new RoostAPI.ItemChicken("chicken_dye_cyan", "Cyan Chicken", ["cyan_dye"]);
    export const $dye_lightgray = new RoostAPI.ItemChicken("chicken_dye_lightgray", "Lightgray Chicken", ["light_gray_dye"]);
    export const $dye_gray = new RoostAPI.ItemChicken("chicken_dye_gray", "Gray Chicken", ["gray_dye"]);
    export const $dye_pink = new RoostAPI.ItemChicken("chicken_dye_pink", "Pink Chicken", ["pink_dye"]);
    export const $dye_lime = new RoostAPI.ItemChicken("chicken_dye_lime", "Lime Chicken", ["lime_dye"]);
    export const $dye_yellow = new RoostAPI.ItemChicken("chicken_dye_yellow", "Yellow Chicken", ["yellow_dye"]);
    export const $dye_lightblue = new RoostAPI.ItemChicken("chicken_dye_lightblue", "Lightblue Chicken", ["light_blue_dye"]);
    export const $dye_magenta = new RoostAPI.ItemChicken("chicken_dye_magenta", "Magenta Chicken", ["magenta_dye"]);
    export const $dye_orange = new RoostAPI.ItemChicken("chicken_dye_orange", "Orange Chicken", ["orange_dye"]);
    export const $dye_white = new RoostAPI.ItemChicken("chicken_dye_white", "Bone White Chicken", ["white_dye", "bone_meal"]);

    $dye_brown.setParents($dye_red, $dye_green);
    $dye_purple.setParents($dye_red, $dye_blue);
    $dye_cyan.setParents($dye_green, $dye_blue);
    $dye_lightgray.setParents($dye_gray, $dye_white);
    $dye_gray.setParents($dye_black, $dye_white);
    $dye_pink.setParents($dye_red, $dye_white);
    $dye_lime.setParents($dye_green, $dye_white);
    $dye_lightblue.setParents($dye_blue, $dye_white);
    $dye_magenta.setParents($dye_purple, $dye_pink);
    $dye_orange.setParents($dye_red, $dye_yellow);


    export const $flint = new RoostAPI.ItemChicken("chicken_flint", "Flint Chicken", ["flint"]);
    export const $quartz = new RoostAPI.ItemChicken("chicken_quartz", "Quartz Chicken", ["quartz"]);
    export const $log = new RoostAPI.ItemChicken("chicken_log", "Log Chicken", ["log"]);
    export const $sand = new RoostAPI.ItemChicken("chicken_sand", "Sand Chicken", ["sand"]);


    export const $string = new RoostAPI.ItemChicken("chicken_string", "String Chicken", ["string"]);
    export const $glowstone = new RoostAPI.ItemChicken("chicken_glowstone", "Glowstone Chicken", ["glowstone_dust"]);
    export const $gunpowder = new RoostAPI.ItemChicken("chicken_gunpowder", "Gunpowder Chicken", ["gunpowder"]);
    export const $redstone = new RoostAPI.ItemChicken("chicken_redstone", "Redstone Chicken", ["redstone"]);
    export const $glass = new RoostAPI.ItemChicken("chicken_glass", "Glass Chicken", ["glass"]);
    export const $iron = new RoostAPI.ItemChicken("chicken_iron", "Iron Chicken", ["iron_nugget"]);
    export const $coal = new RoostAPI.ItemChicken("chicken_coal", "Coal Chicken", ["coal"]);

    $string.setParents($dye_black, $log);
    $glowstone.setParents($quartz, $dye_yellow);
    $gunpowder.setParents($sand, $flint);
    $redstone.setParents($dye_red, $sand);
    $glass.setParents($quartz, $redstone);
    $iron.setParents($flint, $dye_white);
    $coal.setParents($flint, $log);


    export const $gold = new RoostAPI.ItemChicken("chicken_gold", "Gold Chicken", ["gold_nugget"]);
    export const $snowball = new RoostAPI.ItemChicken("chicken_snowball", "Snowball Chicken", ["snowball"]);
    export const $water = new RoostAPI.ItemChicken("chicken_water", "Water Chicken", [ItemID.liquid_egg_water]);
    export const $lava = new RoostAPI.ItemChicken("chicken_lava", "Lava Chicken", [ItemID.liquid_egg_lava]);
    export const $clay = new RoostAPI.ItemChicken("chicken_clay", "Clay Chicken", ["clay_ball"]);
    export const $leather = new RoostAPI.ItemChicken("chicken_leather", "Leather Chicken", ["leather"]);
    export const $netherwart = new RoostAPI.ItemChicken("chicken_netherwart", "Netherwart Chicken", ["nether_wart"]);

    $gold.setParents($iron, $dye_yellow);
    $snowball.setParents($dye_blue, $log);
    $water.setParents($gunpowder, $snowball);
    $lava.setParents($coal, $quartz);
    $clay.setParents($snowball, $sand);
    $leather.setParents($string, $dye_brown);
    $netherwart.setParents($dye_brown, $glowstone);


    export const $diamond = new RoostAPI.ItemChicken("chicken_diamond", "Diamond Chicken", ["diamond"]);
    export const $blaze = new RoostAPI.ItemChicken("chicken_blaze", "Blaze Chicken", ["blaze_rod"]);
    export const $slime = new RoostAPI.ItemChicken("chicken_slime", "Slime Chicken", ["slime_ball"]);

    $diamond.setParents($glass, $gold);
    $blaze.setParents($gold, $lava);
    $slime.setParents($clay, $dye_green);

    export const $ender = new RoostAPI.ItemChicken("chicken_ender", "Ender Chicken", ["ender_pearl"]);
    export const $ghast = new RoostAPI.ItemChicken("chicken_ghast", "Ghast Chicken", ["ghast_tear"]);
    export const $emerald = new RoostAPI.ItemChicken("chicken_emerald", "Emerald Chicken", ["emerald"]);
    export const $magma = new RoostAPI.ItemChicken("chicken_magma", "Magma Chicken", ["magma_cream"]);
    export const $pshard = new RoostAPI.ItemChicken("chicken_pshard", "Prismarin Shard Chicken", ["prismarine_shard"]);
    export const $pcrystal = new RoostAPI.ItemChicken("chicken_pcrystal", "Prismarine Crystal Chicken", ["prismarine_crystals"]);
    export const $obsidian = new RoostAPI.ItemChicken("chicken_obsidian", "Obsidian Chicken", ["obsidian"]);
    export const $soulsand = new RoostAPI.ItemChicken("chicken_soulsand", "Soulsand Chicken", ["soul_sand"]);

    $ender.setParents($diamond, $netherwart);
    $ghast.setParents($dye_white, $blaze);
    $emerald.setParents($diamond, $dye_green);
    $magma.setParents($slime, $blaze);
    $pshard.setParents($water, $dye_blue);
    $pcrystal.setParents($water, $emerald);
    $obsidian.setParents($water, $lava);


    new ChickenEntity($dye_black, "#f2f2f2", "#191919").setBiomeType("NONE");
    new ChickenEntity($dye_red, "#f2f2f2", "#993333").setBiomeType("NONE");
    new ChickenEntity($dye_green, "#f2f2f2", "#667f33").setBiomeType("NONE");
    new ChickenEntity($dye_brown, "#f2f2f2", "#664c33").setBiomeType("NONE");
    new ChickenEntity($dye_blue, "#f2f2f2", "#334cb2").setBiomeType("NONE");
    new ChickenEntity($dye_purple, "#f2f2f2", "#7f3fb2").setBiomeType("NONE");
    new ChickenEntity($dye_cyan, "#f2f2f2", "#4c7f99").setBiomeType("NONE");
    new ChickenEntity($dye_lightgray, "#f2f2f2", "#999999").setBiomeType("NONE");
    new ChickenEntity($dye_gray, "#f2f2f2", "#4c4c4c").setBiomeType("NONE");
    new ChickenEntity($dye_pink, "#f2f2f2", "#f27fa5").setBiomeType("NONE");
    new ChickenEntity($dye_lime, "#f2f2f2", "#7fcc19").setBiomeType("NONE");
    new ChickenEntity($dye_yellow, "#f2f2f2", "#e5e533").setBiomeType("NONE");
    new ChickenEntity($dye_lightblue, "#f2f2f2", "#6699d8").setBiomeType("NONE");
    new ChickenEntity($dye_magenta, "#f2f2f2", "#b24cd8").setBiomeType("NONE");
    new ChickenEntity($dye_orange, "#f2f2f2", "#d87f33").setBiomeType("NONE");
    new ChickenEntity($dye_white, "#f2f2f2", "#ffffff").setDropItem("bone");

    new ChickenEntity($flint, "#6b6b47", "#a3a375");
    new ChickenEntity($quartz, "#4d0000", "#1a0000").setBiomeType("HELL");
    new ChickenEntity($log, "#98846d", "#528358");
    new ChickenEntity($sand, "#ece5b1", "#a7a06c");

    new ChickenEntity($string, "#331a00", "#800000").setDropItem("spider_eye");
    new ChickenEntity($glowstone, "#ffff66", "#ffff00");
    new ChickenEntity($gunpowder, "#999999", "#404040");
    new ChickenEntity($redstone, "#e60000", "#800000");
    new ChickenEntity($glass, "#ffffff", "#eeeeff");
    new ChickenEntity($iron, "#ffffcc", "#ffcccc");
    new ChickenEntity($coal, "#262626", "#000000");
    
    new ChickenEntity($gold, "#cccc00", "#ffff80");
    new ChickenEntity($snowball, "#33bbff", "#0088cc").setBiomeType("SNOW");
    new ChickenEntity($water, "#000099", "#8080ff");
    new ChickenEntity($lava, "#cc3300", "#ffff00").setBiomeType("HELL");
    new ChickenEntity($clay, "#cccccc", "#bfbfbf");
    new ChickenEntity($leather, "#A7A06C", "#919191");
    new ChickenEntity($netherwart, "#800000", "#331a00");

    new ChickenEntity($diamond, "#99ccff", "#e6f2ff");
    new ChickenEntity($blaze, "#ffff66", "#ff3300");
    new ChickenEntity($slime, "#009933", "#99ffbb");

    new ChickenEntity($ender, "#001a00", "#001a33");
    new ChickenEntity($ghast, "#ffffcc", "#ffffff");
    new ChickenEntity($emerald, "#00cc00", "#003300");
    new ChickenEntity($magma, "#1a0500", "#000000");
    new ChickenEntity($pshard, "#43806e", "#9fcbbc");
    new ChickenEntity($pcrystal, "#4e6961", "#dfe9dc");
    new ChickenEntity($obsidian, "#08080e", "#463a60");
    new ChickenEntity($soulsand, "#453125", "#d52f08").setBiomeType("HELL");

    //KEX.LootModule.createLootTableModifier("entities/chicken_dye_blue").addItem(VanillaItemID.nether_star, 1, 0, 1.0);

}


Callback.addCallback("PreLoaded", () => {
    ChickenEntity.generateAllJson();
});