({
    doInit : function(component, event, helper) {
        console.log("doInit 1");
        var messiInfo = {firstname: "Lionel",
                         lastname: "Messi", 
                         country: "Agentina", 
                         fieldNum: 10}
        component.set("v.footballerDetails", messiInfo);
        console.log("doInit 2");
	},
    handleMyFirstEvent : function(component, event, helper){
        console.log("handleMyFirstEvent 1");
        var childInfo = event.getParams("arguments"); //check of the attributes of the event are OK
        if(childInfo){
			component.set("v.footballerDetails", childInfo.childFootDetails);
        }
        console.log("handleMyFirstEvent 2");
    }
})