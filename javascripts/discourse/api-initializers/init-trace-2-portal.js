import { apiInitializer } from "discourse/lib/api";
import { startPageTracking } from "discourse/lib/page-tracker";
import { ajax } from "discourse/lib/ajax";
import loadScript from "discourse/lib/load-script";

/**
 * gal-trace-hits-2-portal — community → portal hit/search tracing
 *
 * LEGACY (pre-2026-11-15): setupLegacyTracePortal + bindLegacy* — frozen behavior
 *   before Discourse v2026.11 deprecation; kept for non-canary users until rollout.
 *   Intentionally NOT optimized (MutationObserver, topic .json fetch, startPageTracking).
 *
 * NEW (2026-11-15+): setupNewTracePortal + bindNew* — v2026.11-safe, optimized path;
 *   canary via new_trace_logic_user_ids, then enable_new_trace_logic_for_all.
 *
 * Removed everywhere: viewTrackingRequired (discourse/lib/ajax export dropped v2026.11).
 */

const TOPIC_URL_PATTERN = /^\/t\//;
const SEARCH_URL_PATTERN = /^\/search/;
const TOPIC_ID_FROM_URL = /\/t\/[^/]+\/(\d+)/;
const xMD5=function($){function _($,_){return $<<_|$>>>32-_}function x($,_){var x,r,F,n,C;return(F=2147483648&$,n=2147483648&_,x=1073741824&$,r=1073741824&_,C=(1073741823&$)+(1073741823&_),x&r)?2147483648^C^F^n:x|r?1073741824&C?3221225472^C^F^n:1073741824^C^F^n:C^F^n}function r($,_,x){return $&_|~$&x}function F($,_,x){return $&x|_&~x}function n($,_,x){return $^_^x}function C($,_,x){return _^($|~x)}function t($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&E|~D&(o=n)),C),A)),x(_($,t),r)}function A($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D&(o=n)|E&~o),C),A)),x(_($,t),r)}function D($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,D^E^(o=n)),C),A)),x(_($,t),r)}function E($,r,F,n,C,t,A){var D,E,o;return $=x($,x(x((D=r,E=F,E^(D|~(o=n))),C),A)),x(_($,t),r)}function o($){var _,x,r="",F="";for(x=0;x<=3;x++)r+=(F="0"+(_=$>>>8*x&255).toString(16)).substr(F.length-2,2);return r}var e,B,u,f,a,c,i,h,v,d=[];for(e=0,d=function $(_){for(var x,r=_.length,F=r+8,n=((F-F%64)/64+1)*16,C=Array(n-1),t=0,A=0;A<r;)x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|_.charCodeAt(A)<<t,A++;return x=(A-A%4)/4,t=A%4*8,C[x]=C[x]|128<<t,C[n-2]=r<<3,C[n-1]=r>>>29,C}($=function $(_){_=_.replace(/\r\n/g,"\n");for(var x="",r=0;r<_.length;r++){var F=_.charCodeAt(r);F<128?x+=String.fromCharCode(F):F>127&&F<2048?(x+=String.fromCharCode(F>>6|192),x+=String.fromCharCode(63&F|128)):(x+=String.fromCharCode(F>>12|224),x+=String.fromCharCode(F>>6&63|128),x+=String.fromCharCode(63&F|128))}return x}($)),c=1732584193,i=4023233417,h=2562383102,v=271733878;e<d.length;e+=16)B=c,u=i,f=h,a=v,c=t(c,i,h,v,d[e+0],7,3614090360),v=t(v,c,i,h,d[e+1],12,3905402710),h=t(h,v,c,i,d[e+2],17,606105819),i=t(i,h,v,c,d[e+3],22,3250441966),c=t(c,i,h,v,d[e+4],7,4118548399),v=t(v,c,i,h,d[e+5],12,1200080426),h=t(h,v,c,i,d[e+6],17,2821735955),i=t(i,h,v,c,d[e+7],22,4249261313),c=t(c,i,h,v,d[e+8],7,1770035416),v=t(v,c,i,h,d[e+9],12,2336552879),h=t(h,v,c,i,d[e+10],17,4294925233),i=t(i,h,v,c,d[e+11],22,2304563134),c=t(c,i,h,v,d[e+12],7,1804603682),v=t(v,c,i,h,d[e+13],12,4254626195),h=t(h,v,c,i,d[e+14],17,2792965006),i=t(i,h,v,c,d[e+15],22,1236535329),c=A(c,i,h,v,d[e+1],5,4129170786),v=A(v,c,i,h,d[e+6],9,3225465664),h=A(h,v,c,i,d[e+11],14,643717713),i=A(i,h,v,c,d[e+0],20,3921069994),c=A(c,i,h,v,d[e+5],5,3593408605),v=A(v,c,i,h,d[e+10],9,38016083),h=A(h,v,c,i,d[e+15],14,3634488961),i=A(i,h,v,c,d[e+4],20,3889429448),c=A(c,i,h,v,d[e+9],5,568446438),v=A(v,c,i,h,d[e+14],9,3275163606),h=A(h,v,c,i,d[e+3],14,4107603335),i=A(i,h,v,c,d[e+8],20,1163531501),c=A(c,i,h,v,d[e+13],5,2850285829),v=A(v,c,i,h,d[e+2],9,4243563512),h=A(h,v,c,i,d[e+7],14,1735328473),i=A(i,h,v,c,d[e+12],20,2368359562),c=D(c,i,h,v,d[e+5],4,4294588738),v=D(v,c,i,h,d[e+8],11,2272392833),h=D(h,v,c,i,d[e+11],16,1839030562),i=D(i,h,v,c,d[e+14],23,4259657740),c=D(c,i,h,v,d[e+1],4,2763975236),v=D(v,c,i,h,d[e+4],11,1272893353),h=D(h,v,c,i,d[e+7],16,4139469664),i=D(i,h,v,c,d[e+10],23,3200236656),c=D(c,i,h,v,d[e+13],4,681279174),v=D(v,c,i,h,d[e+0],11,3936430074),h=D(h,v,c,i,d[e+3],16,3572445317),i=D(i,h,v,c,d[e+6],23,76029189),c=D(c,i,h,v,d[e+9],4,3654602809),v=D(v,c,i,h,d[e+12],11,3873151461),h=D(h,v,c,i,d[e+15],16,530742520),i=D(i,h,v,c,d[e+2],23,3299628645),c=E(c,i,h,v,d[e+0],6,4096336452),v=E(v,c,i,h,d[e+7],10,1126891415),h=E(h,v,c,i,d[e+14],15,2878612391),i=E(i,h,v,c,d[e+5],21,4237533241),c=E(c,i,h,v,d[e+12],6,1700485571),v=E(v,c,i,h,d[e+3],10,2399980690),h=E(h,v,c,i,d[e+10],15,4293915773),i=E(i,h,v,c,d[e+1],21,2240044497),c=E(c,i,h,v,d[e+8],6,1873313359),v=E(v,c,i,h,d[e+15],10,4264355552),h=E(h,v,c,i,d[e+6],15,2734768916),i=E(i,h,v,c,d[e+13],21,1309151649),c=E(c,i,h,v,d[e+4],6,4149444226),v=E(v,c,i,h,d[e+11],10,3174756917),h=E(h,v,c,i,d[e+2],15,718787259),i=E(i,h,v,c,d[e+9],21,3951481745),c=x(c,B),i=x(i,u),h=x(h,f),v=x(v,a);return(o(c)+o(i)+o(h)+o(v)).toLowerCase()};

// ========== SHARED (both paths) ==========

/**
 * @shared
 */
function useNewTraceLogic(currentUser) {
  if (settings.enable_new_trace_logic_for_all) {
    return true;
  }
  const ids = settings.new_trace_logic_user_ids;
  if (!ids) {
    return false;
  }
  return ids.split("|").includes(currentUser.id.toString());
}

/**
 * @shared
 */
function shouldLogCanaryTrace(useNew) {
  return useNew && !settings.enable_new_trace_logic_for_all;
}

/**
 * @shared
 */
function shouldBlockTraceForUser(currentUser) {
  const traceOnlyToAdmins = settings.enable_tracing_only_for_admins;
  return traceOnlyToAdmins && !currentUser.admin;
}

/**
 * @shared
 */
function createTraceContext(api, currentUser, useNew) {
  const debugForUsers = settings.enable_debug_for_user_ids;
  const debugForIDs = debugForUsers ? debugForUsers.split("|") : null;
  let debug = currentUser.admin && settings.enable_debug_for_admins;
  if (debugForIDs && debugForIDs.includes(currentUser.id.toString())) {
    debug = true;
  }
  if (settings.enable_debug_for_all) {
    debug = true;
  }

  const isAdmin = currentUser.admin;
  let postToHost = settings.trace_to_live_portal
    ? "https://portal.algosec.com"
    : "https://dev16-portal.algosec.com";
  if (settings.trace_debug_4_admins && isAdmin) {
    postToHost = "https://dev16-portal.algosec.com";
  }

  const canaryLog = shouldLogCanaryTrace(useNew);

  return {
    api,
    currentUser,
    useNew,
    canaryLog,
    debug,
    debugHitsTracer: debug && settings.enable_debug_of_hits_tracer,
    debugSearchTracer: debug && settings.enable_debug_of_search_tracer,
    isAdmin,
    postTo: postToHost + "/user/community/comtr-action.php",
    widget: postToHost + "/user/community/widget.js",
  };
}

/**
 * @shared
 */
function isUrlForTracing(url, ctx) {
  const hasPrefix = TOPIC_URL_PATTERN.test(url);
  const hasSearchPrefix = SEARCH_URL_PATTERN.test(url);

  if (ctx.debugHitsTracer) {
    console.log("url:", url);
    console.log("hasSearchPrefix:", hasSearchPrefix);
    console.log("hasPrefix:", hasPrefix);
    console.log("algoTrace:", window.algoTrace);
    console.log("algoSecVar_1:", window.algoSecVar_1);
    console.log("algoSecVar_2:", window.algoSecVar_2);
  }

  return {
    shouldTrace: hasPrefix || hasSearchPrefix,
    hasPrefix,
    hasSearchPrefix,
  };
}

/**
 * @shared
 */
function getTraceAuth(ctx) {
  if (!window.algoTrace) {
    return { ok: false, secode: null };
  }
  const secode = xMD5(ctx.currentUser.external_id + window.algoSecVar_2);
  if (secode !== window.algoSecVar_1) {
    return { ok: false, secode: null };
  }
  return { ok: true, secode };
}

/**
 * @shared
 */
function traceToPortal(ctx, secode, dataObj) {
  if (ctx.canaryLog) {
    console.log("[trace-2-portal NEW 2026-11-15]", dataObj.action, ctx.postTo, dataObj);
  }
  return ajax(ctx.postTo, {
    type: "POST",
    headers: {
      "X-Origin": "community.algosec.com",
      Authorization: "Bearer " + secode,
      Promote: "Bearer " + window.algoSecVar_2,
    },
    data: dataObj,
    redirect: "follow",
  })
    .catch((data) => {
      if (ctx.debug) {
        console.log("trace exception", data);
      }
    })
    .finally(() => {
      if (ctx.debug) {
        console.log("traced action:", dataObj.action);
      }
    });
}

// ========== LEGACY pre-2026-11-15 (remove after full rollout + soak) ==========

/**
 * @legacy pre-2026-11-15
 */
function handleLegacyTrace(ctx, theAction, traceTerm) {
  if (ctx.debugSearchTracer) {
    console.log("handleTrace term:", traceTerm);
  }
  if (window.lastTrace === traceTerm) {
    if (ctx.debugSearchTracer) {
      console.log("lastTrace already traced:", lastTrace);
    }
    return false;
  }
  if (!window.algoTrace) {
    return false;
  }
  const secode = xMD5(ctx.currentUser.external_id + window.algoSecVar_2);
  if (secode !== window.algoSecVar_1) {
    return false;
  }
  const encodedTerm = encodeURIComponent(traceTerm);
  traceToPortal(ctx, secode, {
    action: theAction,
    q: encodedTerm,
    xid: ctx.currentUser.external_id,
  });
  window.lastTrace = traceTerm;
}

/**
 * @legacy pre-2026-11-15
 * Duplicate startPageTracking after widget load (no viewTrackingRequired — removed v2026.11).
 */
function bindLegacyPageTracking(api) {
  const router = api.container.lookup("router:main");
  const appEvents = api.container.lookup("service:app-events");
  startPageTracking(router, appEvents);
}

/**
 * @legacy pre-2026-11-15
 */
function bindLegacyPageChangedHandler(appEvents, ctx) {
  appEvents.on("page:changed", (data) => {
    const traceCheck = isUrlForTracing(data.url, ctx);
    if (traceCheck.hasPrefix) {
      const match = data.url.match(TOPIC_ID_FROM_URL);
      if (match) {
        const topicId = match[1];
        ajax(`/t/${topicId}.json`).then((topicData) => {
          const firstPost = topicData.post_stream.posts[0];
          if (firstPost && firstPost.user_id === ctx.currentUser.id) {
            const createdAt = new Date(firstPost.created_at).getTime();
            const now = Date.now();
            if (now - createdAt < 30000) {
              const secode = xMD5(ctx.currentUser.external_id + window.algoSecVar_2);
              if (secode === window.algoSecVar_1 && window.algoTrace) {
                traceToPortal(ctx, secode, {
                  action: "community_new_topic",
                  q: JSON.stringify({
                    title: encodeURIComponent(topicData.title),
                    url: encodeURIComponent(data.url),
                    topic_id: topicData.id,
                    post_id: firstPost.id,
                  }),
                  xid: ctx.currentUser.external_id,
                });
              }
            }
          }
        });
      }
    }
    if (traceCheck.shouldTrace) {
      const the_action = traceCheck.hasPrefix ? "community_hit" : "community_search";
      if (!window.algoTrace) {
        return false;
      }
      const secode = xMD5(ctx.currentUser.external_id + window.algoSecVar_2);
      if (secode !== window.algoSecVar_1) {
        return false;
      }
      const encodedURL = encodeURIComponent(data.url);
      traceToPortal(ctx, secode, {
        action: the_action,
        q: encodedURL,
        xid: ctx.currentUser.external_id,
      });
    }
  });
}

/**
 * @legacy pre-2026-11-15
 */
function bindLegacySearchHandlers(api, ctx) {
  api.addSearchMenuOnKeyDownCallback((searchMenu, event) => {
    if (event.key === "Enter") {
      const traceTerm = searchMenu.search.activeGlobalSearchTerm;
      if (ctx.debugSearchTracer) {
        console.log("event.key", event.key);
        console.log("clicked Enter lets trace:", traceTerm);
      }
      handleLegacyTrace(ctx, "community_search", traceTerm);
    }
  });
}

/**
 * @legacy pre-2026-11-15
 */
function bindLegacyPostCreatedHandler(appEvents, ctx) {
  appEvents.on("post:created", (post) => {
    if (ctx.debug) {
      console.log("post:", post);
    }
    if (!window.algoTrace) {
      return;
    }
    if (!ctx.isAdmin) {
      return;
    }
    const secode = xMD5(ctx.currentUser.external_id + window.algoSecVar_2);
    if (secode !== window.algoSecVar_1) {
      return;
    }
    if (post.posts_count > 1) {
      if (ctx.debug) {
        console.log("Reply created:", post);
      }
      traceToPortal(ctx, secode, {
        action: "community_reply",
        q: JSON.stringify({
          reply_length: encodeURIComponent(post.raw).length,
          topic_id: post.topic_id,
          post_id: post.id,
        }),
        xid: ctx.currentUser.external_id,
      });
    }
  });
}

/**
 * @legacy pre-2026-11-15
 */
function bindLegacyOnloadTrace(ctx) {
  if (!window.algoTrace) {
    return;
  }
  const onloadTrace = isUrlForTracing(window.location.pathname, ctx);
  if (!onloadTrace.shouldTrace) {
    return;
  }
  const onLoadAction = onloadTrace.hasPrefix ? "community_hit" : "community_search";
  const onLoadSecode = xMD5(ctx.currentUser.external_id + window.algoSecVar_2);
  if (onLoadSecode === window.algoSecVar_1) {
    const onLoadEncodedURL = encodeURIComponent(window.location.pathname);
    traceToPortal(ctx, onLoadSecode, {
      action: onLoadAction,
      q: onLoadEncodedURL,
      xid: ctx.currentUser.external_id,
    });
  }
}

/**
 * @legacy pre-2026-11-15
 */
function bindLegacySearchDomObservers(ctx) {
  function onPageLoad() {
    if (ctx.debug) {
      console.log("Page components have finished loading.");
    }
    const searchInputs = document.querySelectorAll(
      ".search-menu-container input#search-term"
    );
    searchInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        if (ctx.debug) {
          console.log("term change:", event.target.value);
        }
        handleLegacyTrace(ctx, "community_search", event.target.value);
      });
    });

    function handleDomChange(mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.matches(".search-menu-container input#search-term")
            ) {
              node.addEventListener("change", (event) => {
                if (ctx.debug) {
                  console.log("term change:", event.target.value);
                }
                handleLegacyTrace(ctx, "community_search", event.target.value);
              });
            }
          });
        }
      }
    }
    const observer = new MutationObserver(handleDomChange);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "complete") {
    setTimeout(onPageLoad, 500);
  } else {
    window.onload = function () {
      setTimeout(onPageLoad, 500);
    };
  }
}

/**
 * @legacy pre-2026-11-15
 */
function setupLegacyTracePortal(api, ctx) {
  if (ctx.debug) {
    console.log("trace-2-portal LEGACY path (pre-2026-11-15)");
    console.log("widget.js: loaded");
  }
  bindLegacyPageTracking(api);
  const appEvents = api.container.lookup("service:app-events");
  bindLegacyPageChangedHandler(appEvents, ctx);
  bindLegacySearchHandlers(api, ctx);
  bindLegacyPostCreatedHandler(appEvents, ctx);
  bindLegacyOnloadTrace(ctx);
  bindLegacySearchDomObservers(ctx);
}

// ========== NEW 2026-11-15 (v2026.11-safe + optimized) ==========

/**
 * @new 2026-11-15
 */
function dedupeHitByUrl(url) {
  if (window.lastTraceHitUrl === url) {
    return true;
  }
  window.lastTraceHitUrl = url;
  return false;
}

/**
 * @new 2026-11-15
 */
function handleNewTrace(ctx, theAction, traceTerm) {
  if (ctx.debugSearchTracer) {
    console.log("handleNewTrace term:", traceTerm);
  }
  if (window.lastTrace === traceTerm) {
    if (ctx.debugSearchTracer) {
      console.log("lastTrace already traced:", window.lastTrace);
    }
    return false;
  }
  const auth = getTraceAuth(ctx);
  if (!auth.ok) {
    return false;
  }
  const encodedTerm = encodeURIComponent(traceTerm);
  traceToPortal(ctx, auth.secode, {
    action: theAction,
    q: encodedTerm,
    xid: ctx.currentUser.external_id,
  });
  window.lastTrace = traceTerm;
}

/**
 * @new 2026-11-15
 * page:changed hits only; new topics handled in bindNewPostCreatedHandler.
 */
function bindNewPageChangedHandler(appEvents, ctx) {
  appEvents.on("page:changed", (data) => {
    const auth = getTraceAuth(ctx);
    if (!auth.ok) {
      return;
    }
    const traceCheck = isUrlForTracing(data.url, ctx);
    if (!traceCheck.shouldTrace) {
      return;
    }
    if (dedupeHitByUrl(data.url)) {
      return;
    }
    const the_action = traceCheck.hasPrefix ? "community_hit" : "community_search";
    const encodedURL = encodeURIComponent(data.url);
    traceToPortal(ctx, auth.secode, {
      action: the_action,
      q: encodedURL,
      xid: ctx.currentUser.external_id,
    });
  });
}

/**
 * @new 2026-11-15
 */
function bindNewSearchHandlers(api, ctx) {
  api.addSearchMenuOnKeyDownCallback((searchMenu, event) => {
    if (event.key === "Enter") {
      const traceTerm = searchMenu.search.activeGlobalSearchTerm;
      if (ctx.debugSearchTracer) {
        console.log("event.key", event.key);
        console.log("clicked Enter lets trace:", traceTerm);
      }
      handleNewTrace(ctx, "community_search", traceTerm);
    }
  });
}

/**
 * @new 2026-11-15
 */
function bindNewPostCreatedHandler(appEvents, ctx) {
  appEvents.on("post:created", (post) => {
    const auth = getTraceAuth(ctx);
    if (!auth.ok) {
      return;
    }
    if (ctx.debug) {
      console.log("post:", post);
    }

    if (post.posts_count === 1 && post.user_id === ctx.currentUser.id) {
      const topicId = post.topic_id;
      ajax(`/t/${topicId}.json`).then((topicData) => {
        const freshAuth = getTraceAuth(ctx);
        if (!freshAuth.ok) {
          return;
        }
        const topicUrl = topicData.slug
          ? `/t/${topicData.slug}/${topicId}`
          : window.location.pathname;
        traceToPortal(ctx, freshAuth.secode, {
          action: "community_new_topic",
          q: JSON.stringify({
            title: encodeURIComponent(topicData.title),
            url: encodeURIComponent(topicUrl),
            topic_id: topicData.id,
            post_id: post.id,
          }),
          xid: ctx.currentUser.external_id,
        });
      });
      return;
    }

    if (post.posts_count > 1 && ctx.isAdmin) {
      if (ctx.debug) {
        console.log("Reply created:", post);
      }
      const rawLen = post.raw ? post.raw.length : 0;
      traceToPortal(ctx, auth.secode, {
        action: "community_reply",
        q: JSON.stringify({
          reply_length: rawLen,
          topic_id: post.topic_id,
          post_id: post.id,
        }),
        xid: ctx.currentUser.external_id,
      });
    }
  });
}

/**
 * @new 2026-11-15
 */
function bindNewOnloadTrace(ctx) {
  const auth = getTraceAuth(ctx);
  if (!auth.ok) {
    return;
  }
  const onloadTrace = isUrlForTracing(window.location.pathname, ctx);
  if (!onloadTrace.shouldTrace) {
    return;
  }
  const url = window.location.pathname;
  if (dedupeHitByUrl(url)) {
    return;
  }
  const onLoadAction = onloadTrace.hasPrefix ? "community_hit" : "community_search";
  traceToPortal(ctx, auth.secode, {
    action: onLoadAction,
    q: encodeURIComponent(url),
    xid: ctx.currentUser.external_id,
  });
}

/**
 * @new 2026-11-15
 */
function setupNewTracePortal(api, ctx) {
  if (ctx.debug) {
    console.log("trace-2-portal NEW path (2026-11-15+, v2026.11-safe)");
    console.log("widget.js: loaded");
  }
  window.lastTraceHitUrl = null;
  const appEvents = api.container.lookup("service:app-events");
  bindNewPageChangedHandler(appEvents, ctx);
  bindNewSearchHandlers(api, ctx);
  bindNewPostCreatedHandler(appEvents, ctx);
  bindNewOnloadTrace(ctx);
}

// ========== apiInitializer entry ==========

export default apiInitializer("1.6", (api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) {
    return;
  }
  if (shouldBlockTraceForUser(currentUser)) {
    return;
  }

  const useNew = useNewTraceLogic(currentUser);
  const ctx = createTraceContext(api, currentUser, useNew);

  if (ctx.debug) {
    console.log("trace-2-portal initializer debug is ON:");
    console.log("admin:", currentUser.admin);
    console.log("currentUser.external_id:", currentUser.external_id);
    console.log("useNewTraceLogic:", useNew);
  }

  window.lastTrace = null;

  loadScript(ctx.widget).then(() => {
    if (useNew) {
      setupNewTracePortal(api, ctx);
    } else {
      setupLegacyTracePortal(api, ctx);
    }
  });
});
