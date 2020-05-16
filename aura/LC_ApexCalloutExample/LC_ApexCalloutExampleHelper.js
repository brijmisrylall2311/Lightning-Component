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
    }
})
