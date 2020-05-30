({
    doInit : function(component, event, helper) {
		console.log("doInit START");
		helper.subscribeToEvent(component, event, helper);
		console.log("doInit END");
	},
    subscribeToEvent : function(component, event, helper) {
		console.log("subscribeToEvent START");
		const empApi = component.find("empApi");
		//enable debug logging (optional)
		empApi.setDebugFlag(true);
        const channel = component.get("v.eventChannel");
        //replay option to get new events
        const replayId = -1; 
        //subscribe to an event
        empApi.subscribe(channel, replayId, $A.getCallback(eventReceived => {
            //process event (this is called each time we receive an event)
            var platformResultsList = component.get("v.platformResultsList");
            platformResultsList.push(eventReceived.data.payload);
            component.set("v.platformResultsList", platformResultsList);
        }))
        .then(subscription => {
            // Confirm that we have subscribed to the event channel.
            // We haven't received an event yet.
            console.log('Subscribed to channel ', subscription.channel);
            // Save subscription to unsubscribe later
            component.set('v.subscription', subscription);
		});
		console.log("subscribeToEvent END");
	}
})