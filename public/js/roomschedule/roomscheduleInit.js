//Define the RoomScheduleApp, and hang it off the window so that it can have other definitions hung off of it.
//Looking at the call of JS files from the laravel page, you can see that this is the first file called
//so that there is a namespace to hang all the other modules off of.
window.RoomScheduleApp = new Backbone.Marionette.Application();