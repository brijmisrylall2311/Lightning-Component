({
    doInit : function(component, event, helper) {
        
    },
    changeColor : function(component, event, helper) {
        console.log("changeColor 1");
        var colourList = component.get("v.colourList");
                
        var colourCounter = component.get("v.colourCounter");
        colourCounter = colourCounter + 1;
        if(colourCounter >= colourList.length){
            colourCounter = 0;
        }
        component.set("v.colourCounter", colourCounter);
        
        var divColor = "background-color:" + colourList[colourCounter];        
        component.set("v.divColor", divColor);
        
        console.log("changeColor 2");
    }
})