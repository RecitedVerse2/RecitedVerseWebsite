"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","239fe3ec57f2ec3ee8dd35c56143b65e"],["static/css/main.81c72f62.css","96a3b26ef0b9648b4afd23542e6a4ae4"],["static/js/main.188f199e.js","8eb10725028e158e44f8b9e143b8ba64"],["static/media/BlankBanner.4747d23d.png","4747d23da30cae2fd85439bd3d2e0df0"],["static/media/CaviarDreams.3670aa49.ttf","3670aa493ee09e92c7b8e1e7c2f5b441"],["static/media/CaviarDreams_Bold.65ab651c.ttf","65ab651cc7cebf7331a4228e830573d1"],["static/media/HP-Icon.e69f3706.png","e69f3706c99c86b65305760376e2f170"],["static/media/Lao MN.5e9d1511.ttc","5e9d1511ce7cbe0545753367616d03dc"],["static/media/MarkerFelt.5fdfc6f6.ttc","5fdfc6f6186ae27ceb89ef04dad5eba5"],["static/media/Mic-Icon.25f206aa.png","25f206aafdc021869caf8be616c6b70a"],["static/media/Monthoers.00b2d934.otf","00b2d9348893dbcd87ce0ee22ab1bb43"],["static/media/MyriadPro-Regular.4dc5956a.otf","4dc5956a31b5832b356867433bb4e516"],["static/media/N_E_B.7b9b8027.TTF","7b9b802741c56d781d7d38ba491ea6e0"],["static/media/N_E_B_B.63089589.TTF","630895899608cd38eaefce7ddf2572ed"],["static/media/PTMono.74ad9e54.ttc","74ad9e54120ff9e840cfaa35001bf283"],["static/media/RV-Final-Icon.084c7f7c.png","084c7f7c54d2722942283deee9f17bbc"],["static/media/SM-Icon.46bd7c34.png","46bd7c341a26a0fce3e68f48e0786ce1"],["static/media/brickBackground.fa0bf54b.jpg","fa0bf54b90decfd21b07e749fc0239c1"],["static/media/facebook-logo.9ce58419.svg","9ce584190aa628500e3d5db4492f0b85"],["static/media/flash_2.4527400e.jpg","4527400e37f0de103241d66e22194416"],["static/media/flash_3.a797ec8c.jpg","a797ec8c317c6ccb45f2b062c13c756a"],["static/media/instagram-logo.484cb02d.svg","484cb02ddc93b421bc2b55c4ae9fae4d"],["static/media/login_img-01.66fe947f.png","66fe947f57ff48b455587c06373aa2c0"],["static/media/rand1.fc35229f.jpg","fc35229f740197b029eae4fae1a027ce"],["static/media/rand2.b755a8b9.jpg","b755a8b965553a1cd5daa9fefc8dd171"],["static/media/rand3.8113e16e.jpg","8113e16ea0cf0444da4dfb330379ff3c"],["static/media/rand4.419d9d31.jpg","419d9d31187ec8c484c036d1bc65aa49"],["static/media/rand5.38a93260.jpg","38a9326033e5c30cb0b7f19fb70e2f5d"],["static/media/rand6.5d8fc470.jpg","5d8fc470239d9282b911e1570198f494"],["static/media/rand7.03123755.jpg","031237550ba4615e7c3461d6c38b98c4"],["static/media/rand8.f9b77448.jpg","f9b77448abd0d4627b8a432227e9206c"],["static/media/twitter-logo.fe7d4823.svg","fe7d482398f86d4387f3eea395693b18"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);a=urlsToCacheKeys.has(t);a||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});