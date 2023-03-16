/*
import { popupAjaxError } from "discourse/lib/ajax-error";
import { ajax } from "discourse/lib/ajax";
import showModal from "discourse/lib/show-modal";
import { defaultHomepage } from "discourse/lib/utilities";
//import {addSaveableUserField, addSaveableUserOptionField } from "discourse/models/user";
import discourseComputed, { observes, bind } from "discourse-common/utils/decorators";
import User from "discourse/models/user";
import { action } from "@ember/object";
import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { and, equal } from "@ember/object/computed";
import { tracked } from "@glimmer/tracking";
import { isEmpty } from "@ember/utils";

// DELETE THIS FILE IF NOT USED BY THE COMPONENT 

//function xSHA1(f){function $(f,$){return f<<$|f>>>32-$}function r(f){var $,r,o,e="";for($=0;$<=6;$+=2)r=f>>>4*$+4&15,o=f>>>4*$&15,e+=r.toString(16)+o.toString(16);return e}function o(f){var $,r,o="";for($=7;$>=0;$--)o+=(r=f>>>4*$&15).toString(16);return o}var e,_,t,a,C,h,x,n,c,d=Array(80),A=1732584193,u=4023233417,s=2562383102,i=271733878,g=3285377520,m=(f=function f($){$=$.replace(/\r\n/g,"\n");for(var r="",o=0;o<$.length;o++){var e=$.charCodeAt(o);e<128?r+=String.fromCharCode(e):e>127&&e<2048?(r+=String.fromCharCode(e>>6|192),r+=String.fromCharCode(63&e|128)):(r+=String.fromCharCode(e>>12|224),r+=String.fromCharCode(e>>6&63|128),r+=String.fromCharCode(63&e|128))}return r}(f)).length,p=[];for(_=0;_<m-3;_+=4)t=f.charCodeAt(_)<<24|f.charCodeAt(_+1)<<16|f.charCodeAt(_+2)<<8|f.charCodeAt(_+3),p.push(t);switch(m%4){case 0:_=2147483648;break;case 1:_=f.charCodeAt(m-1)<<24|8388608;break;case 2:_=f.charCodeAt(m-2)<<24|f.charCodeAt(m-1)<<16|32768;break;case 3:_=f.charCodeAt(m-3)<<24|f.charCodeAt(m-2)<<16|f.charCodeAt(m-1)<<8|128}for(p.push(_);p.length%16!=14;)p.push(0);for(p.push(m>>>29),p.push(m<<3&4294967295),e=0;e<p.length;e+=16){for(_=0;_<16;_++)d[_]=p[e+_];for(_=16;_<=79;_++)d[_]=$(d[_-3]^d[_-8]^d[_-14]^d[_-16],1);for(_=0,a=A,C=u,h=s,x=i,n=g;_<=19;_++)c=$(a,5)+(C&h|~C&x)+n+d[_]+1518500249&4294967295,n=x,x=h,h=$(C,30),C=a,a=c;for(_=20;_<=39;_++)c=$(a,5)+(C^h^x)+n+d[_]+1859775393&4294967295,n=x,x=h,h=$(C,30),C=a,a=c;for(_=40;_<=59;_++)c=$(a,5)+(C&h|C&x|h&x)+n+d[_]+2400959708&4294967295,n=x,x=h,h=$(C,30),C=a,a=c;for(_=60;_<=79;_++)c=$(a,5)+(C^h^x)+n+d[_]+3395469782&4294967295,n=x,x=h,h=$(C,30),C=a,a=c;A=A+a&4294967295,u=u+C&4294967295,s=s+h&4294967295,i=i+x&4294967295,g=g+n&4294967295}var c=o(A)+o(u)+o(s)+o(i)+o(g);return c.toLowerCase()}
const xMD5=function($){function _($,_){return $<<_|$>>>32-_}function x($,_){var x,r,F,n,C;return(F=2147483648&$,n=2147483648&_,x=1073741824&$,r=1073741824&_,C=(1073741823&$)+(1073741823&_),x&r)?2147483648^C^F^n:x|r?1073741824&C?3221225472^C^F^n:1073741824^C^F^n:C^F^n}function r($,_,x){return $&_|~$&x}function F($,_,x){return $&x|_&~x}function n($,_,x){return $^_^x}function C($,_,x){return _^($|~x)}function t($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&E|~D&(o=n)),C),A)),x(_($,t),r)}function A($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&(o=n)|E&~o),C),A)),x(_($,t),r)}function D($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D^E^(o=n)),C),A)),x(_($,t),r)}function E($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,E^(D|~(o=n))),C),A)),x(_($,t),r)}function o($){var _,x,r="",F="";for(x=0;x<=3;x++)r+=(F="0"+(_=$>>>8*x&255).toString(16)).substr(F.length-2,2);return r}var e,B,u,f,a,c,i,h,v,d=[];for(e=0,d=function $(_){for(var x,r=_.length,F=r+8,n=((F-F%64)/64+1)*16,C=Array(n-1),t=0,A=0;A<r;)x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|_.charCodeAt(A)<<t,A++;return x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|128<<t,C[n-2]=r<<3,C[n-1]=r>>>29,C}($=function $(_){_=_.replace(/\r\n/g,"\n");for(var x="",r=0;r<_.length;r++){var F=_.charCodeAt(r);F<128?x+=String.fromCharCode(F):F>127&&F<2048?(x+=String.fromCharCode(F>>6|192),x+=String.fromCharCode(63&F|128)):(x+=String.fromCharCode(F>>12|224),x+=String.fromCharCode(F>>6&63|128),x+=String.fromCharCode(63&F|128))}return x}($)),c=1732584193,i=4023233417,h=2562383102,v=271733878;e<d.length;e+=16)B=c,u=i,f=h,a=v,c=t(c,i,h,v,d[e+0],7,3614090360),v=t(v,c,i,h,d[e+1],12,3905402710),h=t(h,v,c,i,d[e+2],17,606105819),i=t(i,h,v,c,d[e+3],22,3250441966),c=t(c,i,h,v,d[e+4],7,4118548399),v=t(v,c,i,h,d[e+5],12,1200080426),h=t(h,v,c,i,d[e+6],17,2821735955),i=t(i,h,v,c,d[e+7],22,4249261313),c=t(c,i,h,v,d[e+8],7,1770035416),v=t(v,c,i,h,d[e+9],12,2336552879),h=t(h,v,c,i,d[e+10],17,4294925233),i=t(i,h,v,c,d[e+11],22,2304563134),c=t(c,i,h,v,d[e+12],7,1804603682),v=t(v,c,i,h,d[e+13],12,4254626195),h=t(h,v,c,i,d[e+14],17,2792965006),i=t(i,h,v,c,d[e+15],22,1236535329),c=A(c,i,h,v,d[e+1],5,4129170786),v=A(v,c,i,h,d[e+6],9,3225465664),h=A(h,v,c,i,d[e+11],14,643717713),i=A(i,h,v,c,d[e+0],20,3921069994),c=A(c,i,h,v,d[e+5],5,3593408605),v=A(v,c,i,h,d[e+10],9,38016083),h=A(h,v,c,i,d[e+15],14,3634488961),i=A(i,h,v,c,d[e+4],20,3889429448),c=A(c,i,h,v,d[e+9],5,568446438),v=A(v,c,i,h,d[e+14],9,3275163606),h=A(h,v,c,i,d[e+3],14,4107603335),i=A(i,h,v,c,d[e+8],20,1163531501),c=A(c,i,h,v,d[e+13],5,2850285829),v=A(v,c,i,h,d[e+2],9,4243563512),h=A(h,v,c,i,d[e+7],14,1735328473),i=A(i,h,v,c,d[e+12],20,2368359562),c=D(c,i,h,v,d[e+5],4,4294588738),v=D(v,c,i,h,d[e+8],11,2272392833),h=D(h,v,c,i,d[e+11],16,1839030562),i=D(i,h,v,c,d[e+14],23,4259657740),c=D(c,i,h,v,d[e+1],4,2763975236),v=D(v,c,i,h,d[e+4],11,1272893353),h=D(h,v,c,i,d[e+7],16,4139469664),i=D(i,h,v,c,d[e+10],23,3200236656),c=D(c,i,h,v,d[e+13],4,681279174),v=D(v,c,i,h,d[e+0],11,3936430074),h=D(h,v,c,i,d[e+3],16,3572445317),i=D(i,h,v,c,d[e+6],23,76029189),c=D(c,i,h,v,d[e+9],4,3654602809),v=D(v,c,i,h,d[e+12],11,3873151461),h=D(h,v,c,i,d[e+15],16,530742520),i=D(i,h,v,c,d[e+2],23,3299628645),c=E(c,i,h,v,d[e+0],6,4096336452),v=E(v,c,i,h,d[e+7],10,1126891415),h=E(h,v,c,i,d[e+14],15,2878612391),i=E(i,h,v,c,d[e+5],21,4237533241),c=E(c,i,h,v,d[e+12],6,1700485571),v=E(v,c,i,h,d[e+3],10,2399980690),h=E(h,v,c,i,d[e+10],15,4293915773),i=E(i,h,v,c,d[e+1],21,2240044497),c=E(c,i,h,v,d[e+8],6,1873313359),v=E(v,c,i,h,d[e+15],10,4264355552),h=E(h,v,c,i,d[e+6],15,2734768916),i=E(i,h,v,c,d[e+13],21,1309151649),c=E(c,i,h,v,d[e+4],6,4149444226),v=E(v,c,i,h,d[e+11],10,3174756917),h=E(h,v,c,i,d[e+2],15,718787259),i=E(i,h,v,c,d[e+9],21,3951481745),c=x(c,B),i=x(i,u),h=x(h,f),v=x(v,a);return(o(c)+o(i)+o(h)+o(v)).toLowerCase()};

export default Component.extend({
  router: service(),  

  //Object local params
  
  debug: false,
  debugForAdmins: null,
  debugFocusTrap: false,
  debugForUsers: false,
  debug4All: false,

  traceOnlyAdmins:false, 

  siteSettings: service(),

  destroying: false,
  
  init() {

    this._super(...arguments);

    this.traceOnlyAdmins = settings?.enable_tracing_only_for_admins; //from settings.yml
    this.debugForAdmins = settings?.enable_debug_for_admins; //from settings.yml
    this.debug4All = settings?.enable_debug_for_all; //from settings.yml    

    this.debugForUsers = settings?.enable_debug_for_user_ids; //from settings.yml
    var debugForIDs = (this.debugForUsers) ? this.debugForUsers.split("|") : null;
    
    this.debug = false;
    if(this.currentUser.admin && this.debugForAdmins){ this.debug = true; }
    if(debugForIDs && debugForIDs.includes(this.currentUser.id.toString())) { this.debug = true; }
    if(this.debug4All){ this.debug = true; }

    if(this.debug){ console.log('tracing component init:'); }


    if(!this.currentUser.admin && this.traceOnlyAdmins){
      if(this.debug){ console.log('destroy'); }
      this.destroying = true;
      this.destroy();
      return false;
    }
  */
    //call AJAX
    /*
    ajax(`/u/${this.currentUser.username}.json`)
    .then((data) => {        
        if(this.debug){     
          console.log('got user info:');
          console.log(data);        
        }

        if(this.debug){     
          console.log('user info:');
          console.log(this.currentUser);          
          console.log('init ajax end');
        }

      }).catch(popupAjaxError);      
    */  
   /*
  },  
  
  @discourseComputed("router.currentRouteName")
  displayForRoute(currentRouteName) {  
    if(this.debug){
      console.log('discourseComputed displayForRoute');
      console.log('currentRouteName: '+ currentRouteName);
      //console.log('defaultHomepage: '+ defaultHomepage());
    }  
    //TODO: return true if is topic page
    return currentRouteName === `discovery.${defaultHomepage()}`;    
  },

  @discourseComputed("currentUser")
  displayForUser(currentUser) {         
    var traceOnlyAdmins = settings.enable_tracing_only_for_admins; //make this false to enable component all users
    var isAdmin = (currentUser.admin)        
    var blockDisplay = (traceOnlyAdmins && !isAdmin);

    if(this.debug){
      console.log('discourseComputed displayForUser');
      console.log('blockDisplay: '+ blockDisplay);
    }

    return !blockDisplay;
  },

  shouldDisplay: and("displayForUser", "displayForRoute"), 

  // Setting a class on <html> from a component is not great
  // but we need it for backwards compatibility
  @observes("shouldDisplay")
  displayChanged() { 

    if(this.debug){
      console.log('displayChanged');
    }

  },

  didInsertElement() {      
    this._super(...arguments);

    if(this.destroying){return;}

    if(this.debug){
      console.log('didInsertElement');      
    }
        
  },

  didRender(){
    this._super(...arguments);

    if(this.destroying){return;}
    
    //visual effects should not be done here as this is run many times
    if(this.debug){
      console.log('didRender');      
    }    

  },

  willDestroyElement(element){
    if(this.debug){
      console.log('willDestroyElement:');
      console.log(element);
    }  
    this._super(...arguments);
  },

  didDestroyElement() {

  },
 


});
*/