({
    doInit : function(component, event, helper) {
        
    },
    showSpinner : function(component, event, helper){
        console.log("showSpinner 1");
        component.set("v.showSpinner", true);
        console.log("showSpinner 2");
    },
    hideSpinner : function(component, event, helper){
        console.log("hideSpinner 1");
        component.set("v.showSpinner", false);
        console.log("hideSpinner 2");
    },
    generateARandom : function(component, event, helper) {
        console.log("generateARandom 1");

        helper.showSpinner(component, event, helper); //show spinner

        component.set("v.disableAddToTable", false);

        //call the method "getCarList" from Apex Controller "AP_LightningComponentExampleClass"
        var action = component.get("c.myJSONStructure"); 

        //if the apec method needs parameter, we pass them in the action.setParams
        action.setParams({});

        // Callback, response is the result from the callback
        action.setCallback(this, function(response) {
            var state = response.getState(); //status of the response
            //if OK
            if (state === "SUCCESS") {
               var result = JSON.parse(response.getReturnValue());
               console.log("result >>>>  " + JSON.stringify(result));
               component.set("v.detailInfo", result);
               helper.hideSpinner(component, event, helper);
            }
            //if incomplete
            else if (state === "INCOMPLETE") {
                // do something
            }
            //if there is an error
            else if (state === "ERROR") {
                helper.handleError(component, event, helper, response);
            }
        });
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    addToTable : function(component, event, helper) {
        component.set("v.disableAddToTable", true);
        var detailInfo = component.get("v.detailInfo");
        var detailInfoList = component.get("v.detailInfoList");
        detailInfoList.push(detailInfo);
        component.set("v.detailInfoList", detailInfoList);
    },
    fillTableListLogic : function(component, event, helper, aList){
        var detailInfoList = component.get("v.detailInfoList");
        if(detailInfoList.length > 0){
            for(var i=0;i<aList.length;i++){
                detailInfoList.push(aList[i]);
            }
        }
        else{
            detailInfoList = aList;
        }
        component.set("v.detailInfoList", detailInfoList);
    },
    generateTable : function(component, event, helper){
        console.log("generateTable 1");
        var numberToCreate = component.get("v.numberToCreate");

        if(numberToCreate && numberToCreate != 0){
            helper.showSpinner(component, event, helper); //show spinner

            //call the method "getCarList" from Apex Controller "AP_LightningComponentExampleClass"
            var action = component.get("c.getJSONStructureList"); 
    
            //if the apec method needs parameter, we pass them in the action.setParams
            action.setParams({
                "numberOfPersonToCreate" : component.get("v.numberToCreate")
            });
    
            // Callback, response is the result from the callback
            action.setCallback(this, function(response) {
                var state = response.getState(); //status of the response
                //if OK
                if (state === "SUCCESS") {
                   var result = JSON.parse(response.getReturnValue());
                   console.log("result >>>>  " + JSON.stringify(result));
                   helper.fillTableListLogic(component, event, helper, result);
                   helper.hideSpinner(component, event, helper);
                }
                //if incomplete
                else if (state === "INCOMPLETE") {
                    // do something
                }
                //if there is an error
                else if (state === "ERROR") {
                    helper.handleError(component, event, helper, response);
                }
            });
            // $A.enqueueAction adds the server-side action to the queue.
            $A.enqueueAction(action);
        }

        console.log("generateTable 2");
    },
    handleError : function(component, event, helper, response){
        var errors = response.getError();
        if (errors) {
            if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
            }
        } else {
            console.log("Unknown error");
        }
    },
    updateCounter : function(component, event, helper){
        var listSize = component.get("v.detailInfoList").length;
        component.set("v.tableCounter", listSize);
    },
    deleteInfoDetails : function(component, event, helper){
        console.log("deleteInfoDetails 1");
        var params = event.getParams("arguments");
        if(params){
            var infoId = params.infoIdentifier;
            var detailInfoList = component.get("v.detailInfoList");
            for(var i=0;i<detailInfoList.length;i++){
                if(detailInfoList[i].myId == infoId){
                    detailInfoList.splice(i, 1);
                    break;
                }
            }
            component.set("v.detailInfoList", detailInfoList);
        }
        console.log("deleteInfoDetails 2");
    }
})
