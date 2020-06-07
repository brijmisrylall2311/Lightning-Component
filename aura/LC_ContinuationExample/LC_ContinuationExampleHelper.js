({
    showSpinner : function(component, event, helper){
        component.set("v.showSpinner", true);
    },
    hideSpinner : function(component, event, helper){
        component.set("v.showSpinner", false);
    },
    makeCallout : function(component, event, helper){
        console.log("makeCallout 1");

        helper.showSpinner(component, event, helper); //show spinner

        //call the continuation method
        var action = component.get("c.startRequest"); 

        //if parameters needed for this example
        action.setParams({});

        // Callback, response is the result from the callback
        action.setCallback(this, function(response) {
            var state = response.getState(); //status of the response
            //if OK
            if (state === "SUCCESS") {
               var result = response.getReturnValue();
               console.log("result >>>>>>>>> ");
               console.log(result);
               component.set("v.myResponse", result);
                if(result.Continuation1){
                    component.set("v.showResponse1", true);
                }
                if(result.Continuation2){
                    component.set("v.showResponse2", true);
                }
                if(result.Continuation3){
                    component.set("v.showResponse3", true);
                }
                component.set("v.showSpinner", false);
                component.set("v.disableButton", true);
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
        console.log("makeCallout 2");
    }
})
