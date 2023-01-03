ConfigureMultiplayer({
    name: "Chickens",
    version: "3.0",
    isClientOnly: false
});

const scope = {
    RoostAPI: null,
    KEX: null
};

ModAPI.addAPICallback("RoostAPI", function(api){
    scope.RoostAPI = api;
    if(scope.KEX){
        Launch(scope);
    }
});

ModAPI.addAPICallback("KernelExtension", function(api){
    scope.KEX = api;
    if(scope.RoostAPI){
        Launch(scope);
    }
});