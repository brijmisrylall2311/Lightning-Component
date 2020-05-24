({
    doInit : function(component, event, helper) {
        
    },
    setCardColor : function(component, event, helper){
        console.log("setCardColor 1");
        var params = event.getParam('arguments'); //check the params sent from parent
        if (params) {
            //if params not null
            var parentMessage = params.messageFromParent; //get attributes values
            component.set("v.parentMessage", parentMessage);
        }
        //set card colour
        var carDetails = component.get("v.carDetails");
        var carColour = carDetails.Colour__c.toLowerCase();
        if(carColour != "white"){
            var cardStyles = "background-color:" + carColour + ";color:white;";
            component.set("v.cardStyles", cardStyles);
        }
        console.log("setCardColor 2");
    }
})