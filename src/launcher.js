ConfigureMultiplayer({
    name: "Chickens",
    version: "3.0",
    isClientOnly: false
});



ModAPI.addAPICallback("RoostAPI", function(api){
    Launch({RoostAPI: api});
});
