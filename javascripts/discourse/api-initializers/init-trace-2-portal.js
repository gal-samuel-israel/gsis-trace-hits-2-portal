import { apiInitializer } from "discourse/lib/api";
import { startPageTracking } from 'discourse/lib/page-tracker';
import { viewTrackingRequired } from 'discourse/lib/ajax';

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

    if(debug){          
      console.log('trace-2-portal initializer:');
      console.log('admin: ' + currentUser.admin); 
      console.log('id: ' + currentUser.id); 
    }

    var traceOnlyToAdmins = settings.enable_tracing_only_for_admins; //make this false to enable component all users
    var isAdmin = (currentUser.admin)        
    blockTrace = (traceOnlyToAdmins && !isAdmin);

    if(!blockTrace){
      if(debug){ 
        console.log('trace active'); 
        const router = api.container.lookup("router:main");
        console.log('router:', router); 

        router.on('willTransition', viewTrackingRequired);

          let appEvents = api.container.lookup('service:app-events');
          startPageTracking(router, appEvents);

          appEvents.on('page:changed', data => {
            var urlPrefix = "(/t/|/search|/c/";
            var pattern = new RegExp('^' + urlPrefix);
            var hasPrefix = pattern.test(data.url);
            if(hasPrefix) {
              console.log('url:', data.url); 
            }
          });

      }
   
    }

  }  

});

