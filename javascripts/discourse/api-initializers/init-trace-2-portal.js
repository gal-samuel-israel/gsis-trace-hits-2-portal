import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {

  var blockTrace;  

  if (api.getCurrentUser()) {
    const currentUser = api.getCurrentUser()

    var debug = currentUser.admin && settings.enable_debug_for_admins;
    var debugForUsers = settings.enable_debug_for_user_ids;
    var debugForIDs = (debugForUsers) ? debugForUsers.split("|") : null;
    if (debugForIDs && debugForIDs.includes(currentUser.id.toString())) {
      debug = true;
    }

    var debug4All = settings.enable_debug_for_all;
    if(debug4All){ debug = true; }
    
    //const user = container.lookup("service:current-user");
    const router = container.lookup("service:router");

    if(debug){          
      console.log('trace-2-portal initializer:');
      //console.log(user);
      console.log('router: ', router);
      console.log('admin: ' + currentUser.admin); 
      console.log('id: ' + currentUser.id); 
    }

    var traceOnlyToAdmins = settings.enable_tracing_only_for_admins; //make this false to enable component all users
    var isAdmin = (currentUser.admin)        
    blockTrace = (traceOnlyToAdmins && !isAdmin);

    if(!blockTrace){
      if(debug){ console.log('trace active');}
      /*
      api.registerConnectorClass("above-site-header", "home-modal", {
        shouldRender() {
          return true;
        },
      });
    
      api.createWidget("home-modal-widget", {
        tagName: "div.home-modal",
      });
      */
    }

  }  

});

