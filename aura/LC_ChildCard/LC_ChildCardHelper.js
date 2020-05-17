({
    doInit : function(component, event, helper) {
        helper.divColourSet(component, event, helper);
    },
    deleteInfo : function(component, event, helper) {
        console.log("deleteInfo 1");
        var myEvent = component.getEvent("deleteInfoEvent"); //get the registered event by name
        var infoIdentifier = component.get("v.infoIdentifier");
		myEvent.setParams({"infoIdentifier" : infoIdentifier }); //filling the event attributes
        myEvent.fire(); // firing the event
        console.log("deleteInfo 2");
    },
    divColourSet : function(component, event, helper){
        var gender = component.get("v.infoGender");
        var divColorClass;
        if(gender == "Male"){
            divColorClass = "maleColor";
        }
        else{
            divColorClass = "femaleColor";
        }
        var mainContainer = component.find("mainContainer");
        $A.util.addClass(mainContainer, divColorClass);
        console.log("divColourSet 2");
    }
})
