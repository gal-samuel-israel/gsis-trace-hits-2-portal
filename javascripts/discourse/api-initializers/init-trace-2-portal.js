import { apiInitializer } from "discourse/lib/api";
import { startPageTracking } from 'discourse/lib/page-tracker';
import { viewTrackingRequired, ajax} from 'discourse/lib/ajax';
import loadScript from "discourse/lib/load-script";

export default apiInitializer("1.6", (api) => {

  var blockTrace;  
  const xMD5=function($){function _($,_){return $<<_|$>>>32-_}function x($,_){var x,r,F,n,C;return(F=2147483648&$,n=2147483648&_,x=1073741824&$,r=1073741824&_,C=(1073741823&$)+(1073741823&_),x&r)?2147483648^C^F^n:x|r?1073741824&C?3221225472^C^F^n:1073741824^C^F^n:C^F^n}function r($,_,x){return $&_|~$&x}function F($,_,x){return $&x|_&~x}function n($,_,x){return $^_^x}function C($,_,x){return _^($|~x)}function t($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&E|~D&(o=n)),C),A)),x(_($,t),r)}function A($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&(o=n)|E&~o),C),A)),x(_($,t),r)}function D($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D^E^(o=n)),C),A)),x(_($,t),r)}function E($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,E^(D|~(o=n))),C),A)),x(_($,t),r)}function o($){var _,x,r="",F="";for(x=0;x<=3;x++)r+=(F="0"+(_=$>>>8*x&255).toString(16)).substr(F.length-2,2);return r}var e,B,u,f,a,c,i,h,v,d=[];for(e=0,d=function $(_){for(var x,r=_.length,F=r+8,n=((F-F%64)/64+1)*16,C=Array(n-1),t=0,A=0;A<r;)x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|_.charCodeAt(A)<<t,A++;return x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|128<<t,C[n-2]=r<<3,C[n-1]=r>>>29,C}($=function $(_){_=_.replace(/\r\n/g,"\n");for(var x="",r=0;r<_.length;r++){var F=_.charCodeAt(r);F<128?x+=String.fromCharCode(F):F>127&&F<2048?(x+=String.fromCharCode(F>>6|192),x+=String.fromCharCode(63&F|128)):(x+=String.fromCharCode(F>>12|224),x+=String.fromCharCode(F>>6&63|128),x+=String.fromCharCode(63&F|128))}return x}($)),c=1732584193,i=4023233417,h=2562383102,v=271733878;e<d.length;e+=16)B=c,u=i,f=h,a=v,c=t(c,i,h,v,d[e+0],7,3614090360),v=t(v,c,i,h,d[e+1],12,3905402710),h=t(h,v,c,i,d[e+2],17,606105819),i=t(i,h,v,c,d[e+3],22,3250441966),c=t(c,i,h,v,d[e+4],7,4118548399),v=t(v,c,i,h,d[e+5],12,1200080426),h=t(h,v,c,i,d[e+6],17,2821735955),i=t(i,h,v,c,d[e+7],22,4249261313),c=t(c,i,h,v,d[e+8],7,1770035416),v=t(v,c,i,h,d[e+9],12,2336552879),h=t(h,v,c,i,d[e+10],17,4294925233),i=t(i,h,v,c,d[e+11],22,2304563134),c=t(c,i,h,v,d[e+12],7,1804603682),v=t(v,c,i,h,d[e+13],12,4254626195),h=t(h,v,c,i,d[e+14],17,2792965006),i=t(i,h,v,c,d[e+15],22,1236535329),c=A(c,i,h,v,d[e+1],5,4129170786),v=A(v,c,i,h,d[e+6],9,3225465664),h=A(h,v,c,i,d[e+11],14,643717713),i=A(i,h,v,c,d[e+0],20,3921069994),c=A(c,i,h,v,d[e+5],5,3593408605),v=A(v,c,i,h,d[e+10],9,38016083),h=A(h,v,c,i,d[e+15],14,3634488961),i=A(i,h,v,c,d[e+4],20,3889429448),c=A(c,i,h,v,d[e+9],5,568446438),v=A(v,c,i,h,d[e+14],9,3275163606),h=A(h,v,c,i,d[e+3],14,4107603335),i=A(i,h,v,c,d[e+8],20,1163531501),c=A(c,i,h,v,d[e+13],5,2850285829),v=A(v,c,i,h,d[e+2],9,4243563512),h=A(h,v,c,i,d[e+7],14,1735328473),i=A(i,h,v,c,d[e+12],20,2368359562),c=D(c,i,h,v,d[e+5],4,4294588738),v=D(v,c,i,h,d[e+8],11,2272392833),h=D(h,v,c,i,d[e+11],16,1839030562),i=D(i,h,v,c,d[e+14],23,4259657740),c=D(c,i,h,v,d[e+1],4,2763975236),v=D(v,c,i,h,d[e+4],11,1272893353),h=D(h,v,c,i,d[e+7],16,4139469664),i=D(i,h,v,c,d[e+10],23,3200236656),c=D(c,i,h,v,d[e+13],4,681279174),v=D(v,c,i,h,d[e+0],11,3936430074),h=D(h,v,c,i,d[e+3],16,3572445317),i=D(i,h,v,c,d[e+6],23,76029189),c=D(c,i,h,v,d[e+9],4,3654602809),v=D(v,c,i,h,d[e+12],11,3873151461),h=D(h,v,c,i,d[e+15],16,530742520),i=D(i,h,v,c,d[e+2],23,3299628645),c=E(c,i,h,v,d[e+0],6,4096336452),v=E(v,c,i,h,d[e+7],10,1126891415),h=E(h,v,c,i,d[e+14],15,2878612391),i=E(i,h,v,c,d[e+5],21,4237533241),c=E(c,i,h,v,d[e+12],6,1700485571),v=E(v,c,i,h,d[e+3],10,2399980690),h=E(h,v,c,i,d[e+10],15,4293915773),i=E(i,h,v,c,d[e+1],21,2240044497),c=E(c,i,h,v,d[e+8],6,1873313359),v=E(v,c,i,h,d[e+15],10,4264355552),h=E(h,v,c,i,d[e+6],15,2734768916),i=E(i,h,v,c,d[e+13],21,1309151649),c=E(c,i,h,v,d[e+4],6,4149444226),v=E(v,c,i,h,d[e+11],10,3174756917),h=E(h,v,c,i,d[e+2],15,718787259),i=E(i,h,v,c,d[e+9],21,3951481745),c=x(c,B),i=x(i,u),h=x(h,f),v=x(v,a);return(o(c)+o(i)+o(h)+o(v)).toLowerCase()};

  if (api.getCurrentUser()) {
      const currentUser = api.getCurrentUser()

      var debug = currentUser.admin && settings.enable_debug_for_admins;
      var debugForUsers = settings.enable_debug_for_user_ids;
      var debugForIDs = (debugForUsers) ? debugForUsers.split("|") : null;
      if (debugForIDs && debugForIDs.includes(currentUser.id.toString())) { debug = true; }

      var debug4All = settings.enable_debug_for_all;
      if(debug4All){ debug = true; }    

      var debugHitsTracer = debug && settings.enable_debug_of_hits_tracer;
      var debugSearchTracer = debug && settings.enable_debug_of_search_tracer;

      if(debug){          
        console.log('trace-2-portal initializer debug is ON:');
        console.log('admin:' + currentUser.admin); 
        console.log('currentUser.external_id:' + currentUser.external_id); 
      }

      var traceOnlyToAdmins = settings.enable_tracing_only_for_admins; //make this false to enable component all users
      var isAdmin = (currentUser.admin)        
      blockTrace = (traceOnlyToAdmins && !isAdmin);
    
    if(!blockTrace){

        if(debug){ console.log('trace active'); }        
        let postToHost = (settings.trace_to_live_portal) ? 'https://portal.algosec.com':'https://dev16-portal.algosec.com';
        if (settings.trace_debug_4_admins && isAdmin) { postToHost = 'https://dev16-portal.algosec.com'; }
        var postTo = postToHost +'/user/community/comtr-action.php';
        var widget = postToHost +'/user/community/widget.js';

        window.lastTrace = null;
            
        const router = api.container.lookup('router:main');          

        const isUrlForTracing = function(url){
              var urlPrefix = "(/t/)"; // |/c/|/tag/ 
              var searchPrefix = "(/search)";
              var pattern = new RegExp('^' + urlPrefix);
              var s_pattern = new RegExp('^' + searchPrefix);
              var hasPrefix = pattern.test(url);
              var hasSearchPrefix = s_pattern.test(url);

              if(debugHitsTracer){ 
                console.log('url:', url); 
                console.log('hasSearchPrefix:', hasSearchPrefix); 
                console.log('hasPrefix:', hasPrefix);
                console.log('algoTrace:', window.algoTrace); 
                console.log('algoSecVar_1:', window.algoSecVar_1); 
                console.log('algoSecVar_2:', window.algoSecVar_2); 
              } 

              return {
                'shouldTrace':(hasPrefix || hasSearchPrefix),
                'hasPrefix': hasPrefix,
                'hasSearchPrefix': hasSearchPrefix,
              };
        };

        const traceThis = function(postToURL, secode, algoSecVar_2, dataObj){
            ajax(postToURL, {
              type: "POST",
              headers: {
                'X-Origin': 'community.algosec.com',
                'Authorization': 'Bearer ' + secode,
                'Promote': 'Bearer ' + algoSecVar_2,
              },
              data: dataObj,
              redirect: 'follow',
            }).catch((data)=>{
                  if(debug){ console.log('trace exception', data);}
            }).finally(()=>{
                  if(debug){ console.log('traced action:', dataObj.action);}
            });
        };

        const handleTrace = function(theAction, traceTerm){
            if(debugSearchTracer){ console.log('handleTrace term:', traceTerm);}
            if(window.lastTrace === traceTerm){
              if(debugSearchTracer){ console.log('lastTrace already traced:', lastTrace); }
              return false;
            }
            if(!window.algoTrace){return false;}
            var secode = xMD5(currentUser.external_id + window.algoSecVar_2);
            if( secode !== window.algoSecVar_1){ return false; }
            var encodedTerm = encodeURIComponent(traceTerm);              
            traceThis(postTo, secode, window.algoSecVar_2, {
              action: theAction,
              q: encodedTerm,
              xid: currentUser.external_id,                    
            });
            window.lastTrace = traceTerm;
        };

        loadScript(widget).then((resp) => {
              /* if loadScript is successful it sets: var algoTrace = true; var algoSecVar_1 = 'string'; var algoSecVar_2 = 'string'; //session ID */
              if(debug){ console.log('widget.js: loaded'); console.log('algoTrace:', algoTrace); console.log('algoSecVar_1:', algoSecVar_1); console.log('algoSecVar_2:', algoSecVar_2); }                            

              /* Add a callback for onKeyDown in search menu + when enter clicked: trace the term */
              api.addSearchMenuOnKeyDownCallback((searchMenu, event) => {
                  /* if(debug){
                    //console.log('onKeyDownCallback event', event);
                    //console.log('searchMenu', searchMenu);
                    //console.log('searchMenu.search', searchMenu.search);
                    //console.log('searchMenu.search.activeGlobalSearchTerm: ', searchMenu.search.activeGlobalSearchTerm);
                  } */
                  if (event.key === "Enter") {
                      const traceTerm = searchMenu.search.activeGlobalSearchTerm; //document.getElementById("search-term").value;
                      if(debugSearchTracer){ console.log('event.key', event.key); console.log('clicked Enter lets trace:', traceTerm); }
                      handleTrace('community_search', traceTerm);
                  }                                      
              });
                              
              router.on('routeWillChange', viewTrackingRequired);                          
              let appEvents = api.container.lookup('service:app-events');
              startPageTracking(router, appEvents);                

              appEvents.on('page:changed', data => {                
                  var traceCheck = isUrlForTracing(data.url);
                  if(traceCheck.shouldTrace) {                                                                                 
                      var the_action = (traceCheck.hasPrefix) ? 'community_hit':'community_search';                                              
                      if(!window.algoTrace){return false;}
                      var secode = xMD5(currentUser.external_id + window.algoSecVar_2);
                      if( secode !== window.algoSecVar_1){ return false; }
                      var encodedURL = encodeURIComponent(data.url);
                      traceThis(postTo, secode, window.algoSecVar_2, {
                        action: the_action,
                        q: encodedURL,
                        xid: currentUser.external_id,                    
                      });
                  }
              });

              // Listen for composer post success (new topic or reply)
              appEvents.on("post:created", (post) => {
                  if(debug){ console.log('post:',post); }
                  if (!window.algoTrace) { return; }
                  if (!isAdmin) { return; } //only for admins                  

                  var secode = xMD5(currentUser.external_id + window.algoSecVar_2);
                  if (secode !== window.algoSecVar_1) { return; }

                  // New topic: post.post_number === 1
                  if (post.post_number === 1) {
                      if (debug) { console.log("New topic created:", post); }
                      traceThis(postTo, secode, window.algoSecVar_2, {
                          action: "community_new_topic",
                          q: {title: encodeURIComponent(post.title), topic_id: post.topic_id, post_id: post.id},
                          xid: currentUser.external_id
                      });
                  } else if (post.post_number > 1) {
                      // Reply to topic
                      if (debug) { console.log("Reply created:", post); }
                      traceThis(postTo, secode, window.algoSecVar_2, {
                          action: "community_reply",
                          q: {replay_length: encodeURIComponent(post.raw).length, topic_id: post.topic_id, post_id: post.id},
                          xid: currentUser.external_id
                      });
                  }
              });

              //will run once (or first page load or a page refresh)
              if(window.algoTrace){
                  var onloadTrace = isUrlForTracing(window.location.pathname);
                  if(onloadTrace.shouldTrace) {
                      var onLoadAction = (onloadTrace.hasPrefix) ? 'community_hit':'community_search';                      
                      var onLoadSecode = xMD5(currentUser.external_id + window.algoSecVar_2);
                      if( onLoadSecode == window.algoSecVar_1){
                          var onLoadEncodedURL = encodeURIComponent(window.location.pathname);
                          traceThis(postTo, onLoadSecode, window.algoSecVar_2, {
                            action: onLoadAction,
                            q: onLoadEncodedURL,
                            xid: currentUser.external_id,                    
                          });
                      }
                  }
              }
              
              /* Add events to DOM elements dynamically (not the discourse way, but ... seems like we need to) */
              function onPageLoad() {       
                if(debug){ console.log("Page components have finished loading."); }    
                //capture change on input#search-term        
                var searchInputs = document.querySelectorAll('.search-menu-container input#search-term');
                searchInputs.forEach(function(input) {
                    input.addEventListener('change', function(event) {                    
                      if(debug){ console.log('term change:', event.target.value);}
                        handleTrace('community_search', event.target.value);
                    });
                });
                
                //handle DOM mutations        
                function handleDomChange(mutationsList, observer) {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            // Check if the mutation added a new input element
                            mutation.addedNodes.forEach(node => {
                                if (node.nodeType === Node.ELEMENT_NODE && node.matches('.search-menu-container input#search-term')) {
                                    // Attach event listener to the newly added input
                                    node.addEventListener('change', function(event) {
                                      if(debug){ console.log('term change:', event.target.value);}
                                        handleTrace('community_search', event.target.value);
                                    });
                                }
                            });
                        }
                    }
                }          
                // Create a MutationObserver instance
                const observer = new MutationObserver(handleDomChange);
                // Start observing changes in the body element (or any other ancestor)
                observer.observe(document.body, { childList: true, subtree: true });          
              }
            
              // Use window.onload event to wait for the entire page to load and only then start the DOM mutations monitoring etc'...
              if (document.readyState === "complete") {
                  setTimeout(onPageLoad, 500);
              } else {
                  window.onload = function() {
                      setTimeout(onPageLoad, 500);
                  };
              }                            

        }); 
   
    }

  }  

});
