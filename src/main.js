var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
IMPORT("BlockEngine");
IMPORT("EnhancedRecipes");
var Color = android.graphics.Color;
var Math_clamp = function (value, min, max) { return Math.min(Math.max(value, min), max); };
var ChickenClass = /** @class */ (function () {
    function ChickenClass(identifier, name, products, biomeType, eggcolorBase, eggcolorOvl) {
        this.identifier = identifier;
        this.identifierWithGroup = "chickens:" + identifier;
        this.name = name;
        this.skin = "textures/entity/" + identifier;
        this.products = products;
        this.biomeType = biomeType;
        this.eggcolorBase = eggcolorBase;
        this.eggcolorOvl = eggcolorOvl;
        this.breedableList = [];
    }
    ChickenClass.prototype.getIdentifier = function () {
        return this.identifier;
    };
    ChickenClass.prototype.getName = function () {
        return this.name;
    };
    ChickenClass.prototype.getSkin = function () {
        return this.skin;
    };
    ChickenClass.prototype.getProducts = function () {
        return this.products;
    };
    ChickenClass.prototype.getBiomeType = function () {
        return this.biomeType;
    };
    ChickenClass.prototype.addBreedableList = function (mate, baby) {
        this.breedableList.push({ mate: mate, baby: baby });
    };
    ChickenClass.prototype.getBreedableList = function () {
        return this.breedableList;
    };
    ChickenClass.prototype.setParents = function (parent1, parent2) {
        parent1.addBreedableList(parent2, this);
        parent2.addBreedableList(parent1, this);
        this.parent1 = parent1;
        this.parent2 = parent2;
    };
    ChickenClass.prototype.isValidBiome = function (biomeID) {
        var biomeType;
        switch (biomeID) {
            case 8:
                biomeType = "HELL";
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
            case 20:
            case 26:
            case 30:
            case 31:
            case 34:
            case 131:
            case 140:
            case 158:
            case 162:
                biomeType = "SNOW";
                break;
            default:
                biomeType = "NORMAL";
                break;
        }
        return this.biomeType === biomeType;
    };
    ChickenClass.prototype.hasParents = function () {
        return !!this.parent1 && !!this.parent2;
    };
    ChickenClass.prototype.isChildOf = function (parent1, parent2) {
        return this.parent1 == parent1 && this.parent2 == parent2 || this.parent1 == parent2 && this.parent2 == parent1;
    };
    ChickenClass.prototype.getTier = function () {
        if (this.hasParents()) {
            return Math.max(this.parent1.getTier(), this.parent2.getTier()) + 1;
        }
        return 1;
    };
    ChickenClass.prototype.getMinLayTime = function () {
        return Math.max(this.getTier() * 6000, 1) | 0;
    };
    ChickenClass.prototype.getMaxLayTime = function () {
        return this.getMinLayTime() * 2;
    };
    ChickenClass.prototype.writeLangForResource = function (path) {
        FileTools.WriteText(path, "item.spawn_egg.entity.".concat(this.identifierWithGroup, ".name=Spawn ").concat(this.name, "\nentity.").concat(this.identifierWithGroup, ".name=").concat(this.name, "\n"), true);
    };
    ChickenClass.prototype.genEntityJsonForResource = function (dir) {
        var json = {
            "format_version": "1.10.0",
            "minecraft:client_entity": {
                "description": {
                    "identifier": this.identifierWithGroup,
                    //"min_engine_version": "1.12.0",
                    "materials": {
                        "default": "chicken_legs",
                        "legs": "chicken_legs"
                    },
                    "textures": {
                        "default": this.skin
                    },
                    "geometry": {
                        "default": "geometry.chicken.v1.12"
                    },
                    "animations": {
                        "move": "animation.chicken.move",
                        "general": "animation.chicken.general",
                        "look_at_target": "animation.common.look_at_target",
                        "baby_transform": "animation.chicken.baby_transform"
                    },
                    "scripts": {
                        "animate": [
                            "general",
                            { "move": "query.modified_move_speed" },
                            "look_at_target",
                            { "baby_transform": "query.is_baby" }
                        ]
                    },
                    "render_controllers": ["controller.render.chicken"],
                    "spawn_egg": {
                        "base_color": this.eggcolorBase,
                        "overlay_color": this.eggcolorOvl
                    }
                }
            }
        };
        FileTools.WriteJSON(dir + this.identifier + ".entity.json", json, true);
    };
    ChickenClass.prototype.genEntityJsonForBehavior = function (dir) {
        var _this = this;
        var json = {
            "format_version": "1.13.0",
            "minecraft:entity": {
                "description": {
                    "identifier": this.identifierWithGroup,
                    "is_spawnable": true,
                    "is_summonable": true,
                    "is_experimental": false
                },
                "component_groups": {
                    "minecraft:chicken_baby": {
                        "minecraft:is_baby": {},
                        "minecraft:scale": {
                            "value": 0.5
                        },
                        "minecraft:ageable": {
                            "duration": 1200,
                            "feed_items": [
                                "wheat_seeds",
                                "beetroot_seeds",
                                "melon_seeds",
                                "pumpkin_seeds"
                            ],
                            "grow_up": {
                                "event": "minecraft:ageable_grow_up",
                                "target": "self"
                            }
                        },
                        "minecraft:behavior.follow_parent": {
                            "priority": 5,
                            "speed_multiplier": 1.1
                        }
                    },
                    "minecraft:chicken_adult": {
                        "minecraft:experience_reward": {
                            "on_bred": "Math.Random(1,7)",
                            "on_death": "query.last_hit_by_player ? Math.Random(1,3) : 0"
                        },
                        "minecraft:loot": {
                            "table": "loot_tables/entities/" + this.identifier + ".json"
                        },
                        "minecraft:breedable": {
                            "require_tame": false,
                            "breeds_with": (function () {
                                var array = [
                                    {
                                        "mate_type": _this.identifierWithGroup,
                                        "baby_type": _this.identifierWithGroup,
                                        "breed_event": {
                                            "event": "minecraft:entity_born",
                                            "target": "baby"
                                        }
                                    }
                                ];
                                _this.getBreedableList().forEach(function (breedable) {
                                    array.push({
                                        "mate_type": breedable.mate.identifierWithGroup,
                                        "baby_type": breedable.baby.identifierWithGroup,
                                        "breed_event": {
                                            "event": "minecraft:entity_born",
                                            "target": "baby"
                                        }
                                    });
                                });
                                return array;
                            })(),
                            "breed_items": [
                                "wheat_seeds",
                                "beetroot_seeds",
                                "melon_seeds",
                                "pumpkin_seeds"
                            ]
                        },
                        "minecraft:behavior.breed": {
                            "priority": 3,
                            "speed_multiplier": 1.0
                        },
                        "minecraft:rideable": {
                            "seat_count": 1,
                            "family_types": [
                                "zombie"
                            ],
                            "seats": {
                                "position": [0.0, 0.4, 0.0]
                            }
                        },
                        "minecraft:spawn_entity": this.products.map(function (item, index, array) { return ({
                            //"min_wait_time": this.getMinLayTime() * array.length,
                            //"max_wait_time": this.getMaxLayTime() * array.length,
                            "min_wait_time": 30,
                            "max_wait_time": 60,
                            "spawn_sound": "plop",
                            "spawn_item": item,
                            "filters": {
                                "test": "rider_count", "subject": "self", "operator": "==", "value": 0
                            }
                        }); })
                    }
                },
                "components": {
                    "minecraft:type_family": {
                        "family": ["chicken", "mob"]
                    },
                    "minecraft:breathable": {
                        "total_supply": 15,
                        "suffocate_time": 0
                    },
                    "minecraft:collision_box": {
                        "width": 0.6,
                        "height": 0.8
                    },
                    "minecraft:nameable": {},
                    "minecraft:health": {
                        "value": 4,
                        "max": 4
                    },
                    "minecraft:hurt_on_condition": {
                        "damage_conditions": [
                            {
                                "filters": { "test": "in_lava", "subject": "self", "operator": "==", "value": true },
                                "cause": "lava",
                                "damage_per_tick": 4
                            }
                        ]
                    },
                    "minecraft:movement": {
                        "value": 0.25
                    },
                    "minecraft:damage_sensor": {
                        "triggers": {
                            "cause": "fall",
                            "deals_damage": false
                        }
                    },
                    "minecraft:leashable": {
                        "soft_distance": 4.0,
                        "hard_distance": 6.0,
                        "max_distance": 10.0
                    },
                    "minecraft:balloonable": {
                        "mass": 0.6
                    },
                    "minecraft:navigation.walk": {
                        "can_path_over_water": true,
                        "avoid_damage_blocks": true
                    },
                    "minecraft:movement.basic": {},
                    "minecraft:jump.static": {},
                    "minecraft:can_climb": {},
                    "minecraft:behavior.float": {
                        "priority": 0
                    },
                    "minecraft:behavior.panic": {
                        "priority": 1,
                        "speed_multiplier": 1.5
                    },
                    "minecraft:behavior.mount_pathing": {
                        "priority": 2,
                        "speed_multiplier": 1.5,
                        "target_dist": 0.0,
                        "track_target": true
                    },
                    "minecraft:behavior.tempt": {
                        "priority": 4,
                        "speed_multiplier": 1.0,
                        "items": [
                            "wheat_seeds",
                            "beetroot_seeds",
                            "melon_seeds",
                            "pumpkin_seeds"
                        ]
                    },
                    "minecraft:behavior.random_stroll": {
                        "priority": 6,
                        "speed_multiplier": 1.0
                    },
                    "minecraft:behavior.look_at_player": {
                        "priority": 7,
                        "look_distance": 6.0,
                        "probability": 0.02
                    },
                    "minecraft:behavior.random_look_around": {
                        "priority": 8
                    },
                    "minecraft:physics": {},
                    "minecraft:pushable": {
                        "is_pushable": true,
                        "is_pushable_by_piston": true
                    }
                },
                "events": {
                    "from_egg": {
                        "add": { "component_groups": ["minecraft:chicken_baby"] }
                    },
                    "minecraft:entity_spawned": {
                        "randomize": [
                            {
                                "weight": 95,
                                "remove": {},
                                "add": {
                                    "component_groups": [
                                        "minecraft:chicken_adult"
                                    ]
                                }
                            },
                            {
                                "weight": 5,
                                "remove": {},
                                "add": {
                                    "component_groups": [
                                        "minecraft:chicken_baby"
                                    ]
                                }
                            }
                        ]
                    },
                    "minecraft:entity_born": {
                        "remove": {},
                        "add": {
                            "component_groups": [
                                "minecraft:chicken_baby"
                            ]
                        }
                    },
                    "minecraft:ageable_grow_up": {
                        "remove": {
                            "component_groups": [
                                "minecraft:chicken_baby"
                            ]
                        },
                        "add": {
                            "component_groups": [
                                "minecraft:chicken_adult"
                            ]
                        }
                    }
                }
            }
        };
        FileTools.WriteJSON(dir + this.identifier + ".json", json, true);
    };
    ChickenClass.prototype.genLootJsonForBehavior = function (dir) {
        var json = {
            "pools": [
                {
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "loot_table",
                            "name": "loot_tables/chicken",
                            "weight": 1
                        }
                    ]
                },
                {
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "item",
                            "name": "minecraft:apple",
                            "weight": 1,
                            "functions": [
                                {
                                    "function": "set_count",
                                    "count": {
                                        "min": 0,
                                        "max": 2
                                    }
                                },
                                {
                                    "function": "looting_enchant",
                                    "count": {
                                        "min": 0,
                                        "max": 1
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        FileTools.WriteJSON(dir + this.identifier + ".json", json, true);
    };
    return ChickenClass;
}());
var ChickenRegistry;
(function (ChickenRegistry) {
    var chickenData = {};
    FileTools.WriteText(__dir__ + "res_pack/ChickensResource/texts/en_US.lang", "");
    ChickenRegistry.registerChicken = function (chicken) {
        chickenData[chicken.getIdentifier()] = chicken;
        chicken.writeLangForResource(__dir__ + "res_pack/ChickensResource/texts/en_US.lang");
        chicken.genEntityJsonForResource(__dir__ + "res_pack/ChickensResource/entity/");
        chicken.genEntityJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/entities/");
        chicken.genLootJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/loot_tables/entities/");
    };
    ChickenRegistry.existsChicken = function (identifier) {
        return identifier in chickenData;
    };
    ChickenRegistry.getChicken = function (identifier) {
        return chickenData[identifier];
    };
})(ChickenRegistry || (ChickenRegistry = {}));
var Chicken;
(function (Chicken) {
    var dye_black = new ChickenClass("chicken_dye_black", "Ink Black Chicken", ["ink_sac"], "NONE", "#f2f2f2", "#191919");
    var dye_red = new ChickenClass("chicken_dye_red", "Red Chicken", ["red_dye", "apple"], "NONE", "#f2f2f2", "#993333");
    var dye_green = new ChickenClass("chicken_dye_green", "Cactus Green Chicken", ["green_dye"], "NONE", "#f2f2f2", "#667f33");
    var dye_brown = new ChickenClass("chicken_dye_brown", "Cocoa Brown Chicken", ["cocoa_beans"], "NONE", "#f2f2f2", "#664c33");
    var dye_blue = new ChickenClass("chicken_dye_blue", "Lapis Blue Chicken", ["lapis_lazuli"], "NONE", "#f2f2f2", "#334cb2");
    var dye_purple = new ChickenClass("chicken_dye_purple", "Purple Chicken", ["purple_dye"], "NONE", "#f2f2f2", "#7f3fb2");
    var dye_cyan = new ChickenClass("chicken_dye_cyan", "Cyan Chicken", ["cyan_dye"], "NONE", "#f2f2f2", "#4c7f99");
    var dye_lightgray = new ChickenClass("chicken_dye_lightgray", "Lightgray Chicken", ["light_gray_dye"], "NONE", "#f2f2f2", "#999999");
    var dye_gray = new ChickenClass("chicken_dye_gray", "Gray Chicken", ["gray_dye"], "NONE", "#f2f2f2", "#4c4c4c");
    var dye_pink = new ChickenClass("chicken_dye_pink", "Pink Chicken", ["pink_dye"], "NONE", "#f2f2f2", "#f27fa5");
    var dye_lime = new ChickenClass("chicken_dye_lime", "Lime Chicken", ["lime_dye"], "NONE", "#f2f2f2", "#7fcc19");
    var dye_yellow = new ChickenClass("chicken_dye_yellow", "Yellow Chicken", ["yellow_dye"], "NONE", "#f2f2f2", "#e5e533");
    var dye_lightblue = new ChickenClass("chicken_dye_lightblue", "Lightblue Chicken", ["light_blue_dye"], "NONE", "#f2f2f2", "#6699d8");
    var dye_magenta = new ChickenClass("chicken_dye_magenta", "Magenta Chicken", ["magenta_dye"], "NONE", "#f2f2f2", "#b24cd8");
    var dye_orange = new ChickenClass("chicken_dye_orange", "Orange Chicken", ["orange_dye"], "NONE", "#f2f2f2", "#d87f33");
    var dye_white = new ChickenClass("chicken_dye_white", "Bone White Chicken", ["bone_meal"], "NONE", "#f2f2f2", "#ffffff");
    dye_brown.setParents(dye_red, dye_green);
    dye_purple.setParents(dye_red, dye_blue);
    dye_cyan.setParents(dye_green, dye_blue);
    dye_lightgray.setParents(dye_gray, dye_white);
    dye_gray.setParents(dye_black, dye_white);
    dye_pink.setParents(dye_red, dye_white);
    dye_lime.setParents(dye_green, dye_white);
    dye_lightblue.setParents(dye_blue, dye_white);
    dye_magenta.setParents(dye_purple, dye_pink);
    dye_orange.setParents(dye_red, dye_yellow);
    Callback.addCallback("PreLoaded", function () {
        ChickenRegistry.registerChicken(dye_black);
        ChickenRegistry.registerChicken(dye_red);
        ChickenRegistry.registerChicken(dye_green);
        ChickenRegistry.registerChicken(dye_brown);
        ChickenRegistry.registerChicken(dye_blue);
        ChickenRegistry.registerChicken(dye_purple);
        ChickenRegistry.registerChicken(dye_cyan);
        ChickenRegistry.registerChicken(dye_lightgray);
        ChickenRegistry.registerChicken(dye_gray);
        ChickenRegistry.registerChicken(dye_pink);
        ChickenRegistry.registerChicken(dye_lime);
        ChickenRegistry.registerChicken(dye_yellow);
        ChickenRegistry.registerChicken(dye_lightblue);
        ChickenRegistry.registerChicken(dye_magenta);
        ChickenRegistry.registerChicken(dye_orange);
        ChickenRegistry.registerChicken(dye_white);
    });
})(Chicken || (Chicken = {}));
IDRegistry.genItemID("myitem");
Item.createItem("myitem", "Test Item", { name: "test_item", data: 0 });
//KEX.LootModule.createLootTableModifier("entities/chicken").addItem(VanillaItemID.apple, 1, 0, 1.0);
//KEX.LootModule.forceLoad("entities/chicken_dye_black");
Callback.addCallback("PlayerAttack", function (attacker, victim) {
    if (Entity.getCarriedItem(attacker).id === VanillaItemID.stick) {
        var nbt = Entity.getCompoundTag(victim);
        var obj = nbt.toScriptable();
        for (var key in obj) {
            Game.message(key + ": " + obj[key]);
        }
        /*
        const all = nbt.getAllKeys();
        for(let i = 0; i < all.length; i++){
            if(nbt.toScriptable){
                continue;
            }
            Game.message(all[i] + ": " + nbt.getString(all[i]));
        }
        */
        Game.tipMessage("prevent");
        Game.prevent();
    }
});
var ItemColoredEgg = /** @class */ (function (_super) {
    __extends(ItemColoredEgg, _super);
    function ItemColoredEgg(stringID, name, insideEntity) {
        var _this = _super.call(this, stringID, name, stringID) || this;
        Item.addCreativeGroup("colored_egg", "Colored Egg", [_this.id]);
        _this.insideEntity = insideEntity;
        var model = ItemModel.newStandalone();
        var mesh = new RenderMesh();
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
        ItemModel.getFor(_this.id, 0).setModelOverrideCallback(function (item) { return model; });
        return _this;
    }
    ItemColoredEgg.prototype.onProjectileHit = function (projectile, item, target) {
        var _a, _b, _c, _d, _e, _f;
        var x = (_b = (_a = target.coords) === null || _a === void 0 ? void 0 : _a.relative.x) !== null && _b !== void 0 ? _b : Math.round(target.x);
        var y = (_d = (_c = target.coords) === null || _c === void 0 ? void 0 : _c.relative.y) !== null && _d !== void 0 ? _d : Math.round(target.y);
        var z = (_f = (_e = target.coords) === null || _e === void 0 ? void 0 : _e.relative.z) !== null && _f !== void 0 ? _f : Math.round(target.z);
        var rand = Math.random() * 256 | 0;
        var chickens = 0;
        if (rand === 0) { // 1/256
            chickens = 4;
        }
        else if (rand < 32) { // 31/256
            chickens = 1;
        }
        for (var i = 0; i < chickens; i++) {
            Commands.exec("/summon ".concat(this.insideEntity, " ").concat(x, " ").concat(y, " ").concat(z, " minecraft:entity_born"));
        }
    };
    return ItemColoredEgg;
}(ItemThrowable));
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
Callback.addCallback("PreLoaded", function () {
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
var AdjustableContent = /** @class */ (function () {
    function AdjustableContent(content) {
        var _a, _b;
        var _c, _d;
        this.content = content;
        (_a = (_c = this.content).drawing) !== null && _a !== void 0 ? _a : (_c.drawing = []);
        (_b = (_d = this.content).elements) !== null && _b !== void 0 ? _b : (_d.elements = {});
        this.drawing = this.content.drawing;
        this.elements = this.content.elements;
    }
    AdjustableContent.prototype.offset = function (target, x, y) {
        if ("x" in target && "y" in target) {
            target.x += x;
            target.y += y;
        }
    };
    AdjustableContent.prototype.resize = function (target, scale) {
        if ("width" in target && "height" in target) {
            target.width *= scale;
            target.height *= scale;
        }
        else if ("scale" in target) {
            target.scale *= scale;
        }
        else if ("size" in target) {
            target.size *= scale;
        }
    };
    AdjustableContent.prototype.offsetAllDrawing = function (x, y) {
        for (var i = 0; i < this.drawing.length; i++) {
            this.offset(this.drawing[i], x, y);
        }
        return this;
    };
    AdjustableContent.prototype.resizeAllDrawing = function (scale) {
        for (var i = 0; i < this.drawing.length; i++) {
            this.resize(this.drawing[i], scale);
        }
        return this;
    };
    AdjustableContent.prototype.offsetElement = function (key, x, y) {
        var list = typeof key === "string" ? [key] : key;
        var _loop_1 = function (key_1) {
            if (list.some(function (str) { return new RegExp("^" + str.replaceAll("*", ".*") + "$").test(key_1); })) {
                this_1.offset(this_1.elements[key_1], x, y);
            }
        };
        var this_1 = this;
        for (var key_1 in this.elements) {
            _loop_1(key_1);
        }
        return this;
    };
    AdjustableContent.prototype.resizeElement = function (key, scale) {
        var list = typeof key === "string" ? [key] : key;
        var _loop_2 = function (key_2) {
            if (list.some(function (str) { return new RegExp("^" + str.replaceAll("*", ".*") + "$").test(key_2); })) {
                this_2.resize(this_2.elements[key_2], scale);
            }
        };
        var this_2 = this;
        for (var key_2 in this.elements) {
            _loop_2(key_2);
        }
        return this;
    };
    AdjustableContent.prototype.offsetAll = function (x, y) {
        return this.offsetAllDrawing(x, y).offsetElement("*", x, y);
    };
    AdjustableContent.prototype.resizeAll = function (scale) {
        return this.resizeAllDrawing(scale).resizeElement("*", scale);
    };
    AdjustableContent.prototype.getContent = function () {
        return this.content;
    };
    return AdjustableContent;
}());
var McFontPaint = (function () {
    var paint = new android.graphics.Paint();
    paint.setTypeface(WRAP_JAVA("com.zhekasmirnov.innercore.utils.FileTools").getMcTypeface());
    paint.setTextSize(16);
    return paint;
})();
var FrameTex = UI.FrameTextureSource.get("workbench_frame3");
var FrameTexCentralColor = FrameTex.getCentralColor();
/*
class SugoiWindow {

    private winGroup: UI.WindowGroup;
    private mainWin: UI.Window;
    private invWin: UI.Window;
    private ovlWin: UI.Window;

    constructor(content: UI.WindowContent){

        const screenHeight = UI.getScreenHeight();

        const showFunc = (elem, event) => {
            alert("inv: " + elem.source.id);
            this.showTooltips("Tooltips Test", elem, event);
        };

        const contentMain = new AdjustableContent({
            location: {x: 400, y: 0, width: 600, height: screenHeight},
            drawing: [
                {type: "background", color: Color.WHITE}
            ],
            elements: {
                "$slot": {type: "slot", x: 200, y: 200, size: 100, visual: true}
            }
        });

        const contentInv = new AdjustableContent({
            location: {x: 0, y: 0, width: 400, height: screenHeight},
            drawing: [
                {type: "background", color: Color.LTGRAY}
            ],
            elements: {
                ...((): UI.ElementSet => {
                    const elems: UI.ElementSet = {};
                    for(let i = 0; i < 9; i++){
                        elems["$inv" + i] = {type: "invSlot", x: i * 100 + 50, y: 520, size: 100, index: i, onTouchEvent: showFunc};
                    }
                    for(let i = 0; i < 27; i++){
                        elems["$inv" + (i + 9)] = {type: "invSlot", x: (i % 9) * 100 + 50, y: (i / 9 | 0) * 100 + 200, size: 100, index: i + 9};
                    }
                    return elems;
                })()
            }
        });

        const contentOvl = new AdjustableContent({
            location: {x: 0, y: 0, width: 1000, height: screenHeight},
            drawing: [
                {type: "background", color: Color.TRANSPARENT}
            ],
            elements: {
                $ttText: {type: "text", x: -1000, y: -1000, z: 1, font: {color: Color.WHITE, size: 16, shadow: 0.5}, multiline: true},
                $ttFrame: {type: "frame", x: -1000, y: -1000, width: 64, height: 64, scale: 1, bitmap: "workbench_frame3"},
                $highlight: {type: "image", x: -1000, y: -1000, width: 64, height: 64, scale: 1, bitmap: "_selection"}
            }
        });

        this.winGroup = new UI.WindowGroup();

        this.mainWin = new UI.Window(contentMain.getContent());
        this.invWin = new UI.Window(contentInv.getContent());
        this.ovlWin = new UI.Window(contentOvl.getContent());

        this.invWin.setInventoryNeeded(true);
        this.ovlWin.setTouchable(false);
        this.ovlWin.setAsGameOverlay(true);

        this.winGroup.addWindowInstance("main", this.mainWin);
        this.winGroup.addWindowInstance("inv", this.invWin);
        this.winGroup.addWindowInstance("ovl", this.ovlWin);

        this.winGroup.setCloseOnBackPressed(true);

    }

    createHighlightBmp (w: number, h: number): android.graphics.Bitmap  {
        const bitmap = new android.graphics.Bitmap.createBitmap(w | 0, h | 0, android.graphics.Bitmap.Config.ARGB_8888);
        const canvas = new android.graphics.Canvas(bitmap);
        canvas.drawARGB(127, 255, 255, 255);
        return bitmap.copy(android.graphics.Bitmap.Config.ARGB_8888, true);
    }

    showTooltips(str: string, elem: UI.Element, event: {x: number, y: number, localX: number, localY: number, type: TouchEventType}): void {
        const location = elem.window.getLocation();
        const ovlElems = this.ovlWin.getElements();
        const $ttText = ovlElems.get("$ttText");
        const $ttFrame = ovlElems.get("$ttFrame");
        const $highlight = ovlElems.get("$highlight");
        const MOVEtoLONG_CLICK = event.type == "LONG_CLICK" && $ttFrame.x !== -1000 && $ttFrame.y !== -1000;
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;
        if(str && (event.type == "MOVE" || MOVEtoLONG_CLICK)){

            x = location.x + location.windowToGlobal(elem.x) | 0;
            y = location.y + location.windowToGlobal(elem.y) | 0;
            w = location.windowToGlobal(elem.elementRect.width()) | 0;
            h = location.windowToGlobal(elem.elementRect.height()) | 0;
            if($highlight.elementRect.width() !== w || $highlight.elementRect.height() !== h){
                $highlight.texture = new UI.Texture(this.createHighlightBmp(w, h));
                $highlight.setSize(w, h);
            }
            $highlight.setPosition(x, y);

            const split = str.split("\n");
            w = Math.max(...split.map(s => McFontPaint.measureText(s))) + 20;
            h = split.length * 18 + 16;
            x = location.x + location.windowToGlobal(event.x);
            y = location.y + location.windowToGlobal(event.y) - h - 50;
            if(y < -10){
                y = location.y + location.windowToGlobal(event.y) + 70;
            }
            if($ttFrame.elementRect.width() !== w || $ttFrame.elementRect.height() !== h){
                $ttFrame.texture = new UI.Texture(FrameTex.expandAndScale(w, h, 1, FrameTexCentralColor));
                $ttFrame.setSize(w, h);
            }
            $ttText.setPosition(Math_clamp(x - w / 2, 0, 1000 - w) + 10, y + 7);
            $ttText.setBinding("text", str);
            $ttFrame.setPosition(Math_clamp(x - w / 2, 0, 1000 - w), y);

            if(!Threading.getThread("sugoiWin_showTooltips")){
                Threading.initThread("sugoiWin_showTooltips", () => {
                    while(elem.isTouched){
                        java.lang.Thread.sleep(200);
                    }
                    $ttText.setPosition(-1000, -1000);
                    $ttFrame.setPosition(-1000, -1000);
                    $highlight.setPosition(-1000, -1000);
                });
            }

        }
        else{
            $ttText.setPosition(-1000, -1000);
            $ttFrame.setPosition(-1000, -1000);
            $highlight.setPosition(-1000, -1000);
        }
    }

    get window(): UI.WindowGroup {
        return this.winGroup;
    }

}


const TestWindow = new SugoiWindow({
    drawing: [],
    elements: {}
});


IDRegistry.genBlockID("test_te");
Block.createBlock("test_te", [{name: "Test TE", texture: [["stone", 0]], inCreative: true}]);

class TestTE extends TileEntityBase {

    getScreenByName(screenName: string): UI.IWindow {
        return TestWindow.window;
    }

}

TileEntity.registerPrototype(BlockID.test_te, new TestTE());
*/ 
var SugoiWindow = /** @class */ (function () {
    function SugoiWindow() {
        var _this = this;
        this.whInv = { w: 180, h: 120 };
        this.whMain = { w: 400, h: 300 };
        this.borderPos = 500;
        this.paddingLR = 20;
        this.group = new UI.WindowGroup();
        this.winInv = new UI.Window({
            location: this.createLocationInv(),
            drawing: [
                { type: "background", color: Color.LTGRAY }
            ],
            elements: {}
        });
        this.winMain = new UI.Window({
            location: this.createLocationMain(),
            drawing: [
                { type: "background", color: Color.WHITE }
            ],
            elements: {}
        });
        this.winOvl = new UI.Window({
            location: { x: 0, y: 0, width: 1000, height: SugoiWindow.screenHeight },
            drawing: [
                { type: "background", color: Color.TRANSPARENT }
            ],
            elements: {
                $scroll: { type: "scroll", x: 100, y: SugoiWindow.screenHeight - 100, length: 800, onTouchEvent: function (elem, event) {
                        var pos = Math.round(event.localX * 600);
                        pos = Math.round(pos / 10) * 10;
                        event.localX = pos / 600;
                        _this.scrollBorder(pos + 200);
                    } }
            }
        });
        this.winInv.setInventoryNeeded(true);
        //this.winOvl.setTouchable(false);
        this.winOvl.setAsGameOverlay(true);
        this.group.addWindowInstance("inv", this.winInv);
        this.group.addWindowInstance("main", this.winMain);
        this.group.addWindowInstance("ovl", this.winOvl);
        this.group.setCloseOnBackPressed(true);
    }
    SugoiWindow.prototype.createLocationInv = function () {
        var x = this.paddingLR;
        var width = this.borderPos - this.paddingLR * 2;
        var height = width / this.whInv.w * this.whInv.h;
        if (height > SugoiWindow.screenHeight) {
            height = SugoiWindow.screenHeight;
            width = height / this.whInv.h * this.whInv.w;
            x = (this.borderPos - width) / 2;
        }
        return { x: x, y: 0, width: width, height: height };
    };
    SugoiWindow.prototype.createLocationMain = function () {
        var x = this.borderPos + this.paddingLR;
        var width = (1000 - this.borderPos) - this.paddingLR * 2;
        var height = width / this.whMain.w * this.whMain.h;
        if (height > SugoiWindow.screenHeight) {
            height = SugoiWindow.screenHeight;
            width = height / this.whMain.h * this.whMain.w;
            x = (1000 - this.borderPos - width) / 2;
        }
        return { x: x, y: 0, width: width, height: height };
    };
    SugoiWindow.prototype.scrollBorder = function (pos) {
        if (this.borderPos === pos) {
            return;
        }
        alert("scroll" + pos);
        this.borderPos = Math_clamp(pos, 200, 800);
        var locInv = this.createLocationInv();
        var locMain = this.createLocationMain();
        this.winInv.getLocation().set(locInv.x, locInv.y, locInv.width, locInv.height);
        this.winMain.getLocation().set(locMain.x, locMain.y, locMain.width, locMain.height);
        this.winInv.forceRefresh();
        this.winMain.forceRefresh();
    };
    Object.defineProperty(SugoiWindow.prototype, "window", {
        get: function () {
            return this.group;
        },
        enumerable: false,
        configurable: true
    });
    SugoiWindow.screenHeight = UI.getScreenHeight();
    return SugoiWindow;
}());
var TestWindow = new SugoiWindow();
IDRegistry.genBlockID("test_te");
Block.createBlock("test_te", [{ name: "Test TE", texture: [["stone", 0]], inCreative: true }]);
var TestTE = /** @class */ (function (_super) {
    __extends(TestTE, _super);
    function TestTE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestTE.prototype.getScreenByName = function (screenName) {
        return TestWindow.window;
    };
    return TestTE;
}(TileEntityBase));
TileEntity.registerPrototype(BlockID.test_te, new TestTE());
