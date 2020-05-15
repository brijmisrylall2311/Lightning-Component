({
    changeNeighbourColour : function(component, event, helper){
        console.log("changeNeighbourColour 1");
        var myApplicationEvent = $A.get("e.c:LC_MyApplication_Event");
        myApplicationEvent.fire();
        console.log("changeNeighbourColour 2");
    }
})