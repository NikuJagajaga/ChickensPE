type ChickenBiomeType = "NONE" | "NORMAL" | "SNOW" | "HELL";

class ChickenEntity {

    private static entities: ChickenEntity[] = [];

    static generateAllJson(): void {
        FileTools.WriteText(__dir__ + "res_pack/ChickensResource/texts/en_US.lang", "");
        this.entities.forEach(ent => {
            ent.writeLangForResource(__dir__ + "res_pack/ChickensResource/texts/en_US.lang");
            ent.genEntityJsonForResource(__dir__ + "res_pack/ChickensResource/entity/");
            ent.genEntityJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/entities/");
            ent.genLootJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/loot_tables/entities/");
            if(ent.biomeType != "NONE" && ent.chicken.getTier() == 1){
                ent.genSpawnJsonForBehavior(__dir__ + "beh_pack/ChickensBehavior/spawn_rules/");
            }
        });
        this.entities.length = 0;
    }

    private chicken: RoostAPI.ItemChicken;
    private eggColorBase: string;
    private eggColorOvl: string;
    private biomeType: ChickenBiomeType;
    private dropItem: Tile;

    constructor(chicken: RoostAPI.ItemChicken, eggColorBase: string, eggColorOvl: string){
        chicken.setEntityIdentifier("chickens:" + chicken.stringID);
        ItemRegistry.registerItem(chicken);
        this.chicken = chicken;
        this.biomeType = "NORMAL";
        this.eggColorBase = eggColorBase;
        this.eggColorOvl = eggColorOvl;
        ChickenEntity.entities.push(this);
    }

    setBiomeType(biomeType: ChickenBiomeType): ChickenEntity {
        this.biomeType = biomeType;
        return this;
    }

    setDropItem(item: number | Tile | Recipes2.VanillaID): ChickenEntity {
        switch(typeof item){
            case "number":
                this.dropItem = {id: item, data: 0};
                break;
            case "string":
                this.dropItem = IDConverter.getIDData(item);
                break;
            default:
                this.dropItem = item;
        }
        return this;
    }

    getDropItems(): string[] {
        if(this.dropItem){
            return [getAddonItemIdentifier(this.dropItem.id) + ""];
        }
        return this.chicken.getProducts().map(product => getAddonItemIdentifier(product.id) + "");
    }

    writeLangForResource(path: string): void {
        FileTools.WriteText(path, `item.spawn_egg.entity.${this.chicken.identifier}.name=Spawn ${this.chicken.name}\nentity.${this.chicken.identifier}.name=${this.chicken.name}\n`, true);
    }

    genEntityJsonForResource(dir: string): void {
        const json = {
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
                            {"move": "query.modified_move_speed"},
                            "look_at_target",
                            {"baby_transform": "query.is_baby"}
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
    }

    genEntityJsonForBehavior(dir: string): void {
        const json = {
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
                        "minecraft:is_baby": {
                        },
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
                            "breeds_with": ((): any[] => {
                                const array = [
                                    {
                                        "mate_type": this.chicken.identifier,
                                        "baby_type": this.chicken.identifier,
                                        "breed_event": {
                                            "event": "minecraft:entity_born",
                                            "target": "baby"
                                        }
                                    }
                                ];
                                this.chicken.getBreedableList().forEach(breedable => {
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
                            "position": [ 0.0, 0.4, 0.0 ]
                            }
                        },
                        "minecraft:spawn_entity": this.chicken.getProducts().map((item, index, array) => ({
                            "min_wait_time": this.chicken.getMinLayTime() * array.length,
                            "max_wait_time": this.chicken.getMaxLayTime() * array.length,
                            "spawn_sound": "plop",
                            "spawn_item": getAddonItemIdentifier(item.id) + "",
                            "filters": {
                                "test": "rider_count", "subject": "self", "operator": "==", "value": 0
                            }
                        }))
                    }
                },

                "components": {
                    "minecraft:type_family": {
                        "family": [ "chicken", "mob" ]
                    },
                    "minecraft:breathable": {
                        "total_supply": 15,
                        "suffocate_time": 0
                    },
                    "minecraft:collision_box": {
                        "width": 0.6,
                        "height": 0.8
                    },
                    "minecraft:nameable": {
                    },
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
                    "minecraft:movement.basic": {

                    },
                    "minecraft:jump.static": {
                    },
                    "minecraft:can_climb": {
                    },
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
                    "minecraft:physics": {
                    },
                    "minecraft:pushable": {
                        "is_pushable": true,
                        "is_pushable_by_piston": true
                    }
                },

                "events": {

                    "from_egg": {
                        "add": { "component_groups": [ "minecraft:chicken_baby" ] }
                    },

                    "minecraft:entity_spawned": {
                        "randomize": [
                            {
                                "weight": 95,
                                "remove": {
                                },
                                "add": {
                                    "component_groups": [
                                        "minecraft:chicken_adult"
                                    ]
                                }
                            },
                            {
                                "weight": 5,
                                "remove": {
                                },
                                "add": {
                                    "component_groups": [
                                        "minecraft:chicken_baby"
                                    ]

                                }
                            }
                        ]
                    },

                    "minecraft:entity_born": {
                        "remove": {
                        },
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
    }

    genLootJsonForBehavior(dir: string): void {
        const json = {
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
                    "entries": (() => this.getDropItems().map(item => ({
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
                    })))()
                }
            ]
        };
        FileTools.WriteJSON(dir + this.chicken.stringID + ".json", json, true);
    }

    genSpawnJsonForBehavior(dir: string): void {
        const json = {
            "format_version": "1.8.0",
            "minecraft:spawn_rules": {
                "description": {
                    "identifier": this.chicken.identifier,
                    "population_control": "animal"
                },
                "conditions": [
                    (() => {
                        const condition = {
                            "minecraft:weight": {
                                "default": 10
                            },
                            "minecraft:herd": {
                                "min_size": 2,
                                "max_size": 4
                            }
                        };
                        switch(this.biomeType){
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
                                    "value": this.biomeType == "NORMAL" ? "animal" : "frozen"
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
    }

}