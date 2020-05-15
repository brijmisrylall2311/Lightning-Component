({
    doInit : function(component, event, helper) {
        console.log("do init 1");		
    },
    addSum : function(component, event, helper) {
        console.log("addSum 1");
        var aNumber = parseInt(component.get("v.aNumber"));
        if(aNumber || aNumber == 0){
            var aSum = parseInt(component.get("v.aSum"));            
            aSum = aSum + aNumber;
            component.set("v.aSum", aSum);
            //increment counter
            helper.incrementCounter(component, event, helper);
        }
        console.log("addSum 2 >>>  " + aSum);
    },
    incrementCounter : function(component, event, helper) {
        console.log("incrementCounter 1");
        var myCounter = component.get("v.aCounter");
        myCounter++;
        component.set("v.aCounter", myCounter);
        //calculate average
  		helper.calculateAvg(component, event, helper);
        console.log("incrementCounter 2 >>>  " + myCounter);
    },
    calculateAvg : function(component, event, helper){
        console.log("calculateAvg 1");
    	var myCounter = component.get("v.aCounter");
    	var mySum = component.get("v.aSum");
    	var averageResult = mySum / myCounter;
    	component.set("v.anAverage", averageResult);
        console.log("calculateAvg 2");
	}
})