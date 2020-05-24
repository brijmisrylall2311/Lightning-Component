({
    doInit : function(component, event, helper) {

    },
    showSpinner : function(component, event, helper){
        component.set("v.showSpinner", true);
    },
    hideSpinner : function(component, event, helper){
        component.set("v.showSpinner", false);
    },
    retriveCarDetails : function(component, event, helper){
        console.log("retriveCarDetails 1");

        helper.showSpinner(component, event, helper); //show spinner

        //call the method "getCarList" from Apex Controller "AP_LightningComponentExampleClass"
        var action = component.get("c.getCarList"); 

        //if the apec method needs parameter, we pass them in the action.setParams
        action.setParams({});

        // Callback, response is the result from the callback
        action.setCallback(this, function(response) {
            var state = response.getState(); //status of the response
            //if OK
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.carList", result);
                component.set("v.disableSetColor", false);
                helper.hideSpinner(component, event, helper);
            }
            //if incomplete
            else if (state === "INCOMPLETE") {
                // do something
            }
            //if there is an error
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
        console.log("retriveCarDetails 2");   
    },
    setCarColour : function(component, event, helper){
        console.log("setCarColour 1");
        var carCards = component.find("carCard"); //search child components by auraId
        //this check is essential as component.find will return an array if there are more than
        //one child component and if there is only one child component, it will not return an array
        //but a simple variable instead
        if(Array.isArray(carCards)){ 
            for(var i=0;i<carCards.length;i++){
                //in case there are more than one child component
                carCards[i].setColourMethod("A message from parent !"); //calling the aura method of the child component and filling the attribute
            }
        }
        else{
            //in case there is only one child component
            carCards.setColourMethod("A message from parent !"); //calling the aura method of the child component and filling the attribute
        }
        component.set("v.disableSetColor", true); //disable set colour button
        console.log("setCarColour 2");
    }
})
