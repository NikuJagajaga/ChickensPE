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
var getAddonItemIdentifier = function (id) {
    if (IDRegistry.isVanilla(id)) {
        for (var key in VanillaBlockID) {
            //@ts-ignore
            if (VanillaBlockID[key] === id) {
                return "minecraft:" + key;
            }
        }
        for (var key in VanillaItemID) {
            //@ts-ignore
            if (VanillaItemID[key] === id) {
                return "minecraft:" + key;
            }
        }
        return;
    }
    var info = IDRegistry.getIdInfo(id);
    if (info) {
        return "minecraft:" + info.split(":")[1];
    }
    return "";
};
Callback.addCallback("PostLoaded", function () {
    ChickenEntity.generateAllJson();
});
var ItemColoredEgg = /** @class */ (function (_super) {
    __extends(ItemColoredEgg, _super);
    function ItemColoredEgg(stringID, name, insideEntity) {
        var _this = _super.call(this, stringID, name, stringID) || this;
        _this.setMaxStack(16);
        _this.insideEntity = insideEntity;
        Item.addCreativeGroup("colored_egg", "Colored Eggs", [_this.id]);
        return _this;
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
var ItemLiquidEgg = /** @class */ (function (_super) {
    __extends(ItemLiquidEgg, _super);
    function ItemLiquidEgg(stringID, name, liquid) {
        var _this = _super.call(this, stringID, name, stringID) || this;
        _this.setMaxStack(16);
        _this.liquid = liquid;
        Item.addCreativeGroup("liquid_egg", "Liquid Eggs", [_this.id]);
        return _this;
    }
    ItemLiquidEgg.prototype.onItemUse = function (coords, item, block, player) {
        var region = WorldRegion.getForActor(player);
        var place;
        if (World.canTileBeReplaced(block.id, block.data)) {
            place = coords;
        }
        else {
            var block2 = region.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
            if (!World.canTileBeReplaced(block2.id, block2.data)) {
                return;
            }
            place = coords.relative;
        }
        region.setBlock(place, LiquidRegistry.getBlockByLiquid(this.liquid), 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    };
    return ItemLiquidEgg;
}(ItemCommon));
ItemRegistry.registerItem(new ItemLiquidEgg("liquid_egg_water", "Water Egg", "water"));
ItemRegistry.registerItem(new ItemLiquidEgg("liquid_egg_lava", "Lava Egg", "lava"));
var ChickenEntity = /** @class */ (function () {
    function ChickenEntity(chicken, eggColorBase, eggColorOvl) {
        chicken.setEntityIdentifier("chickens:" + chicken.stringID);
        ItemRegistry.registerItem(chicken);
        this.chicken = chicken;
        this.biomeType = "NORMAL";
        this.eggColorBase = eggColorBase;
        this.eggColorOvl = eggColorOvl;
        ChickenEntity.entities.push(this);
    }
    ChickenEntity.generateAllJson = function () {
        FileTools.WriteText(__dir__ + "res_pack/ChickensResource/texts/en_US.lang", "");
        this.entities.forEach(function (ent) {
            ent.writeLangForResource(__dir__ + "res_pack/ChickensResource/texts/en_US.lang");
            ent.genEntityJsonForResource(__dir__ + "res_pack/ChickensResource/entity/");
            ent.genEntityJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/entities/");
            ent.genLootJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/loot_tables/entities/");
            if (ent.biomeType != "NONE" && ent.chicken.getTier() == 1) {
                ent.genSpawnJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/spawn_rules/");
            }
        });
        this.entities.length = 0;
    };
    ChickenEntity.prototype.setBiomeType = function (biomeType) {
        this.biomeType = biomeType;
        return this;
    };
    ChickenEntity.prototype.setDropItem = function (item) {
        switch (typeof item) {
            case "number":
                this.dropItem = { id: item, data: 0 };
                break;
            case "string":
                this.dropItem = IDConverter.getIDData(item);
                break;
            default:
                this.dropItem = item;
        }
        return this;
    };
    ChickenEntity.prototype.getDropItems = function () {
        if (this.dropItem) {
            return [getAddonItemIdentifier(this.dropItem.id) + ""];
        }
        return this.chicken.getProducts().map(function (product) { return getAddonItemIdentifier(product.id) + ""; });
    };
    ChickenEntity.prototype.writeLangForResource = function (path) {
        FileTools.WriteText(path, "item.spawn_egg.entity.".concat(this.chicken.identifier, ".name=Spawn ").concat(this.chicken.name, "\nentity.").concat(this.chicken.identifier, ".name=").concat(this.chicken.name, "\n"), true);
    };
    ChickenEntity.prototype.genEntityJsonForResource = function (dir) {
        var json = {
            "format_version": "1.10.0",
            "minecraft:client_entity": {
                "description": {
                    "identifier": this.chicken.identifier,
                    //"min_engine_version": "1.12.0",
                    "materials": {
                        "default": "chicken_legs",
                        "legs": "chicken_legs"
                    },
                    "textures": {
                        "default": "textures/entity/" + this.chicken.stringID
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
                        "base_color": this.eggColorBase,
                        "overlay_color": this.eggColorOvl
                    }
                }
            }
        };
        FileTools.WriteJSON(dir + this.chicken.stringID + ".entity.json", json, true);
    };
    ChickenEntity.prototype.genEntityJsonForBehavior = function (dir) {
        var _this = this;
        var json = {
            "format_version": "1.13.0",
            "minecraft:entity": {
                "description": {
                    "identifier": this.chicken.identifier,
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
                            "table": "loot_tables/entities/" + this.chicken.stringID + ".json"
                        },
                        "minecraft:breedable": {
                            "require_tame": false,
                            "breeds_with": (function () {
                                var array = [
                                    {
                                        "mate_type": _this.chicken.identifier,
                                        "baby_type": _this.chicken.identifier,
                                        "breed_event": {
                                            "event": "minecraft:entity_born",
                                            "target": "baby"
                                        }
                                    }
                                ];
                                _this.chicken.getBreedableList().forEach(function (breedable) {
                                    array.push({
                                        "mate_type": breedable.mate.identifier,
                                        "baby_type": breedable.baby.identifier,
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
                        "minecraft:spawn_entity": this.chicken.getProducts().map(function (item, index, array) { return ({
                            "min_wait_time": _this.chicken.getMinLayTime() * array.length,
                            "max_wait_time": _this.chicken.getMaxLayTime() * array.length,
                            "spawn_sound": "plop",
                            "spawn_item": getAddonItemIdentifier(item.id) + "",
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
        FileTools.WriteJSON(dir + this.chicken.stringID + ".json", json, true);
    };
    ChickenEntity.prototype.genLootJsonForBehavior = function (dir) {
        var _this = this;
        var json = {
            "pools": [
                {
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "loot_table",
                            "name": "loot_tables/entities/chicken",
                            "weight": 1
                        }
                    ]
                },
                {
                    "rolls": 1,
                    "entries": (function () { return _this.getDropItems().map(function (item) { return ({
                        "type": "item",
                        "name": item,
                        "weight": 1,
                        "functions": [
                            {
                                "function": "set_count",
                                "count": {
                                    "min": 0,
                                    "max": 1
                                }
                            }
                        ]
                    }); }); })()
                }
            ]
        };
        FileTools.WriteJSON(dir + this.chicken.stringID + ".json", json, true);
    };
    ChickenEntity.prototype.genSpawnJsonForBehavior = function (dir) {
        var _this = this;
        var json = {
            "format_version": "1.8.0",
            "minecraft:spawn_rules": {
                "description": {
                    "identifier": this.chicken.identifier,
                    "population_control": "animal"
                },
                "conditions": [
                    (function () {
                        var condition = {
                            "minecraft:weight": {
                                "default": 10
                            },
                            "minecraft:herd": {
                                "min_size": 2,
                                "max_size": 4
                            }
                        };
                        switch (_this.biomeType) {
                            case "NORMAL":
                            case "SNOW":
                                condition["minecraft:spawns_on_surface"] = {};
                                condition["minecraft:spawns_on_block_filter"] = "minecraft:grass";
                                condition["minecraft:brightness_filter"] = {
                                    "min": 7,
                                    "max": 15,
                                    "adjust_for_weather": false
                                };
                                condition["minecraft:biome_filter"] = {
                                    "test": "has_biome_tag",
                                    "operator": "==",
                                    "value": _this.biomeType == "NORMAL" ? "animal" : "frozen"
                                };
                                break;
                            case "HELL":
                                condition["minecraft:spawns_underground"] = {};
                                condition["minecraft:biome_filter"] = {
                                    "test": "has_biome_tag",
                                    "operator": "==",
                                    "value": "nether"
                                };
                                break;
                        }
                        return condition;
                    })()
                ]
            }
        };
        FileTools.WriteJSON(dir + this.chicken.stringID + ".json", json, true);
    };
    ChickenEntity.entities = [];
    return ChickenEntity;
}());
var RoostAPI;
(function (RoostAPI) {
    var Chicken;
    (function (Chicken) {
        Chicken.$smart = new RoostAPI.ItemChicken("chicken_smart", "Smart Chicken", ["egg"]);
        Callback.addCallback("PlayerAttack", function (player, entity) {
            var item = Entity.getCarriedItem(player);
            if (item.id == VanillaItemID.book && Entity.getTypeName(entity).split("<")[0] == Chicken.$vanilla.identifier) {
                var pos = Entity.getPosition(entity);
                var look = Entity.getLookAngle(entity);
                Entity.remove(entity);
                var ent = AddonEntityRegistry.spawn(pos.x, pos.y, pos.z, Chicken.$smart.identifier) - 0;
                Entity.setLookAngle(ent, look.yaw, look.pitch);
                for (var i = 0; i < 20; i++) {
                    Particles.addParticle(EParticleType.REDSTONE, pos.x + Math.random() * 0.6 - 0.3, pos.y + Math.random() * 0.6, pos.z + Math.random() * 0.6 - 0.3, Math.random() * 0.02, Math.random() * 0.2, Math.random() * 0.02);
                }
            }
        });
        Chicken.$dye_black = new RoostAPI.ItemChicken("chicken_dye_black", "Ink Black Chicken", ["black_dye", "ink_sac"]);
        Chicken.$dye_red = new RoostAPI.ItemChicken("chicken_dye_red", "Red Chicken", ["red_dye"]);
        Chicken.$dye_green = new RoostAPI.ItemChicken("chicken_dye_green", "Cactus Green Chicken", ["green_dye", "cactus"]);
        Chicken.$dye_brown = new RoostAPI.ItemChicken("chicken_dye_brown", "Cocoa Brown Chicken", ["brown_dye", "cocoa_beans"]);
        Chicken.$dye_blue = new RoostAPI.ItemChicken("chicken_dye_blue", "Lapis Blue Chicken", ["blue_dye", "lapis_lazuli"]);
        Chicken.$dye_purple = new RoostAPI.ItemChicken("chicken_dye_purple", "Purple Chicken", ["purple_dye"]);
        Chicken.$dye_cyan = new RoostAPI.ItemChicken("chicken_dye_cyan", "Cyan Chicken", ["cyan_dye"]);
        Chicken.$dye_lightgray = new RoostAPI.ItemChicken("chicken_dye_lightgray", "Light Gray Chicken", ["light_gray_dye"]);
        Chicken.$dye_gray = new RoostAPI.ItemChicken("chicken_dye_gray", "Gray Chicken", ["gray_dye"]);
        Chicken.$dye_pink = new RoostAPI.ItemChicken("chicken_dye_pink", "Pink Chicken", ["pink_dye"]);
        Chicken.$dye_lime = new RoostAPI.ItemChicken("chicken_dye_lime", "Lime Chicken", ["lime_dye"]);
        Chicken.$dye_yellow = new RoostAPI.ItemChicken("chicken_dye_yellow", "Yellow Chicken", ["yellow_dye"]);
        Chicken.$dye_lightblue = new RoostAPI.ItemChicken("chicken_dye_lightblue", "Light Blue Chicken", ["light_blue_dye"]);
        Chicken.$dye_magenta = new RoostAPI.ItemChicken("chicken_dye_magenta", "Magenta Chicken", ["magenta_dye"]);
        Chicken.$dye_orange = new RoostAPI.ItemChicken("chicken_dye_orange", "Orange Chicken", ["orange_dye"]);
        Chicken.$dye_white = new RoostAPI.ItemChicken("chicken_dye_white", "Bone White Chicken", ["white_dye", "bone_meal"]);
        Chicken.$dye_brown.setParents(Chicken.$dye_red, Chicken.$dye_green);
        Chicken.$dye_purple.setParents(Chicken.$dye_red, Chicken.$dye_blue);
        Chicken.$dye_cyan.setParents(Chicken.$dye_green, Chicken.$dye_blue);
        Chicken.$dye_lightgray.setParents(Chicken.$dye_gray, Chicken.$dye_white);
        Chicken.$dye_gray.setParents(Chicken.$dye_black, Chicken.$dye_white);
        Chicken.$dye_pink.setParents(Chicken.$dye_red, Chicken.$dye_white);
        Chicken.$dye_lime.setParents(Chicken.$dye_green, Chicken.$dye_white);
        Chicken.$dye_lightblue.setParents(Chicken.$dye_blue, Chicken.$dye_white);
        Chicken.$dye_magenta.setParents(Chicken.$dye_purple, Chicken.$dye_pink);
        Chicken.$dye_orange.setParents(Chicken.$dye_red, Chicken.$dye_yellow);
        Chicken.$flint = new RoostAPI.ItemChicken("chicken_flint", "Flint Chicken", ["flint"]);
        Chicken.$quartz = new RoostAPI.ItemChicken("chicken_quartz", "Quartz Chicken", ["quartz"]);
        Chicken.$log = new RoostAPI.ItemChicken("chicken_log", "Log Chicken", ["log"]);
        Chicken.$sand = new RoostAPI.ItemChicken("chicken_sand", "Sand Chicken", ["sand"]);
        Chicken.$string = new RoostAPI.ItemChicken("chicken_string", "String Chicken", ["string"]);
        Chicken.$glowstone = new RoostAPI.ItemChicken("chicken_glowstone", "Glowstone Chicken", ["glowstone_dust"]);
        Chicken.$gunpowder = new RoostAPI.ItemChicken("chicken_gunpowder", "Gunpowder Chicken", ["gunpowder"]);
        Chicken.$redstone = new RoostAPI.ItemChicken("chicken_redstone", "Redstone Chicken", ["redstone"]);
        Chicken.$glass = new RoostAPI.ItemChicken("chicken_glass", "Glass Chicken", ["glass"]);
        Chicken.$iron = new RoostAPI.ItemChicken("chicken_iron", "Iron Chicken", ["iron_nugget"]);
        Chicken.$coal = new RoostAPI.ItemChicken("chicken_coal", "Coal Chicken", ["coal"]);
        Chicken.$string.setParents(Chicken.$dye_black, Chicken.$log);
        Chicken.$glowstone.setParents(Chicken.$quartz, Chicken.$dye_yellow);
        Chicken.$gunpowder.setParents(Chicken.$sand, Chicken.$flint);
        Chicken.$redstone.setParents(Chicken.$dye_red, Chicken.$sand);
        Chicken.$glass.setParents(Chicken.$quartz, Chicken.$redstone);
        Chicken.$iron.setParents(Chicken.$flint, Chicken.$dye_white);
        Chicken.$coal.setParents(Chicken.$flint, Chicken.$log);
        Chicken.$gold = new RoostAPI.ItemChicken("chicken_gold", "Gold Chicken", ["gold_nugget"]);
        Chicken.$snowball = new RoostAPI.ItemChicken("chicken_snowball", "Snowball Chicken", ["snowball"]);
        Chicken.$water = new RoostAPI.ItemChicken("chicken_water", "Water Chicken", [ItemID.liquid_egg_water]);
        Chicken.$lava = new RoostAPI.ItemChicken("chicken_lava", "Lava Chicken", [ItemID.liquid_egg_lava]);
        Chicken.$clay = new RoostAPI.ItemChicken("chicken_clay", "Clay Chicken", ["clay_ball"]);
        Chicken.$leather = new RoostAPI.ItemChicken("chicken_leather", "Leather Chicken", ["leather"]);
        Chicken.$netherwart = new RoostAPI.ItemChicken("chicken_netherwart", "Nether Wart Chicken", ["nether_wart"]);
        Chicken.$gold.setParents(Chicken.$iron, Chicken.$dye_yellow);
        Chicken.$snowball.setParents(Chicken.$dye_blue, Chicken.$log);
        Chicken.$water.setParents(Chicken.$gunpowder, Chicken.$snowball);
        Chicken.$lava.setParents(Chicken.$coal, Chicken.$quartz);
        Chicken.$clay.setParents(Chicken.$snowball, Chicken.$sand);
        Chicken.$leather.setParents(Chicken.$string, Chicken.$dye_brown);
        Chicken.$netherwart.setParents(Chicken.$dye_brown, Chicken.$glowstone);
        Chicken.$diamond = new RoostAPI.ItemChicken("chicken_diamond", "Diamond Chicken", ["diamond"]);
        Chicken.$blaze = new RoostAPI.ItemChicken("chicken_blaze", "Blaze Chicken", ["blaze_rod"]);
        Chicken.$slime = new RoostAPI.ItemChicken("chicken_slime", "Slime Chicken", ["slime_ball"]);
        Chicken.$diamond.setParents(Chicken.$glass, Chicken.$gold);
        Chicken.$blaze.setParents(Chicken.$gold, Chicken.$lava);
        Chicken.$slime.setParents(Chicken.$clay, Chicken.$dye_green);
        Chicken.$ender = new RoostAPI.ItemChicken("chicken_ender", "Ender Chicken", ["ender_pearl"]);
        Chicken.$ghast = new RoostAPI.ItemChicken("chicken_ghast", "Ghast Chicken", ["ghast_tear"]);
        Chicken.$emerald = new RoostAPI.ItemChicken("chicken_emerald", "Emerald Chicken", ["emerald"]);
        Chicken.$magmacream = new RoostAPI.ItemChicken("chicken_magmacream", "Magma Cream Chicken", ["magma_cream"]);
        Chicken.$pshard = new RoostAPI.ItemChicken("chicken_pshard", "Prismarin Shard Chicken", ["prismarine_shard"]);
        Chicken.$pcrystal = new RoostAPI.ItemChicken("chicken_pcrystal", "Prismarine Crystal Chicken", ["prismarine_crystals"]);
        Chicken.$obsidian = new RoostAPI.ItemChicken("chicken_obsidian", "Obsidian Chicken", ["obsidian"]);
        Chicken.$soulsand = new RoostAPI.ItemChicken("chicken_soulsand", "Soulsand Chicken", ["soul_sand"]);
        Chicken.$ender.setParents(Chicken.$diamond, Chicken.$netherwart);
        Chicken.$ghast.setParents(Chicken.$dye_white, Chicken.$blaze);
        Chicken.$emerald.setParents(Chicken.$diamond, Chicken.$dye_green);
        Chicken.$magmacream.setParents(Chicken.$slime, Chicken.$blaze);
        Chicken.$pshard.setParents(Chicken.$water, Chicken.$dye_blue);
        Chicken.$pcrystal.setParents(Chicken.$water, Chicken.$emerald);
        Chicken.$obsidian.setParents(Chicken.$water, Chicken.$lava);
        new ChickenEntity(Chicken.$smart, "#ffffff", "#ffff00").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_black, "#f2f2f2", "#191919").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_red, "#f2f2f2", "#993333").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_green, "#f2f2f2", "#667f33").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_brown, "#f2f2f2", "#664c33").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_blue, "#f2f2f2", "#334cb2").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_purple, "#f2f2f2", "#7f3fb2").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_cyan, "#f2f2f2", "#4c7f99").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_lightgray, "#f2f2f2", "#999999").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_gray, "#f2f2f2", "#4c4c4c").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_pink, "#f2f2f2", "#f27fa5").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_lime, "#f2f2f2", "#7fcc19").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_yellow, "#f2f2f2", "#e5e533").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_lightblue, "#f2f2f2", "#6699d8").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_magenta, "#f2f2f2", "#b24cd8").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_orange, "#f2f2f2", "#d87f33").setBiomeType("NONE");
        new ChickenEntity(Chicken.$dye_white, "#f2f2f2", "#ffffff").setDropItem("bone");
        new ChickenEntity(Chicken.$flint, "#6b6b47", "#a3a375");
        new ChickenEntity(Chicken.$quartz, "#4d0000", "#1a0000").setBiomeType("HELL");
        new ChickenEntity(Chicken.$log, "#98846d", "#528358");
        new ChickenEntity(Chicken.$sand, "#ece5b1", "#a7a06c");
        new ChickenEntity(Chicken.$string, "#331a00", "#800000").setDropItem("spider_eye");
        new ChickenEntity(Chicken.$glowstone, "#ffff66", "#ffff00");
        new ChickenEntity(Chicken.$gunpowder, "#999999", "#404040");
        new ChickenEntity(Chicken.$redstone, "#e60000", "#800000");
        new ChickenEntity(Chicken.$glass, "#ffffff", "#eeeeff");
        new ChickenEntity(Chicken.$iron, "#ffffcc", "#ffcccc");
        new ChickenEntity(Chicken.$coal, "#262626", "#000000");
        new ChickenEntity(Chicken.$gold, "#cccc00", "#ffff80");
        new ChickenEntity(Chicken.$snowball, "#33bbff", "#0088cc").setBiomeType("SNOW");
        new ChickenEntity(Chicken.$water, "#000099", "#8080ff");
        new ChickenEntity(Chicken.$lava, "#cc3300", "#ffff00").setBiomeType("HELL");
        new ChickenEntity(Chicken.$clay, "#cccccc", "#bfbfbf");
        new ChickenEntity(Chicken.$leather, "#A7A06C", "#919191");
        new ChickenEntity(Chicken.$netherwart, "#800000", "#331a00");
        new ChickenEntity(Chicken.$diamond, "#99ccff", "#e6f2ff");
        new ChickenEntity(Chicken.$blaze, "#ffff66", "#ff3300");
        new ChickenEntity(Chicken.$slime, "#009933", "#99ffbb");
        new ChickenEntity(Chicken.$ender, "#001a00", "#001a33");
        new ChickenEntity(Chicken.$ghast, "#ffffcc", "#ffffff");
        new ChickenEntity(Chicken.$emerald, "#00cc00", "#003300");
        new ChickenEntity(Chicken.$magmacream, "#1a0500", "#000000");
        new ChickenEntity(Chicken.$pshard, "#43806e", "#9fcbbc");
        new ChickenEntity(Chicken.$pcrystal, "#4e6961", "#dfe9dc");
        new ChickenEntity(Chicken.$obsidian, "#08080e", "#463a60");
        new ChickenEntity(Chicken.$soulsand, "#453125", "#d52f08").setBiomeType("HELL");
        //KEX.LootModule.createLootTableModifier("entities/chicken_dye_blue").addItem(VanillaItemID.nether_star, 1, 0, 1.0);
    })(Chicken = RoostAPI.Chicken || (RoostAPI.Chicken = {}));
})(RoostAPI || (RoostAPI = {}));
