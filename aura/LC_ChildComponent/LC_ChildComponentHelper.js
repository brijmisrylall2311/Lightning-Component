({
    doInit : function(component, event, helper) {
        console.log("doInit 1");
        var ronaldoInfo = {firstname: "Cristiano",
                           lastname: "Ronaldo", 
                           country: "Portugal", 
                           fieldNum: 7}
        component.set("v.childFootballerDetails", ronaldoInfo);
        console.log("doInit 2");
    },
    sendInfoToParent : function(component, event, helper){
        console.log("sendInfoToParent 1");
        var myEvent = component.getEvent("myFirstEvent"); //get the registered event by name
        var detailsToSend = component.get("v.childFootballerDetails");
		myEvent.setParams({"childFootDetails" : detailsToSend }); //filling the event attributes
        myEvent.fire(); // firing the event
        console.log("sendInfoToParent 2");
    },
})