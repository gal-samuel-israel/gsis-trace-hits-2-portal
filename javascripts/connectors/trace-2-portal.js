import discourseComputed from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";

export default {
  setupComponent() {
    this.reopen({
      router: service(),
      debug: false,
      debugForAdmins: null,
      debugFocusTrap: false,
      debugForUsers: false,
      debug4All: false,    
      traceOnlyAdmins:false, 

      @discourseComputed("router.currentRouteName")
      tracing2Portal(currentRouteName) {

        this.traceOnlyAdmins = settings?.enable_tracing_only_for_admins; //from settings.yml
        this.debugForAdmins = settings?.enable_debug_for_admins; //from settings.yml
        this.debug4All = settings?.enable_debug_for_all; //from settings.yml    
    
        this.debugForUsers = settings?.enable_debug_for_user_ids; //from settings.yml
        var debugForIDs = (this.debugForUsers) ? this.debugForUsers.split("|") : null;
        
        this.debug = false;
        if(this.currentUser.admin && this.debugForAdmins){ this.debug = true; }
        if(debugForIDs && debugForIDs.includes(this.currentUser.id.toString())) { this.debug = true; }
        if(this.debug4All){ this.debug = true; }
    
        if(this.debug){ 
            console.log('trace-2-portal:'); 
            console.log('currentRouteName: ', currentRouteName);
        }
        
      },
    });
  },
};
