urlsToPrefetch = [
    "/",
    "/meal",
    "/calculator",
    "/offline",
    "/static/js/bundle.js",
    "/static/media/main.5ce8ac2a93bb44c2a19e.png",
    "icons/PWA192.png",
    "icons/favicon.ico",
    "/static/media/Offline.cfc2dc1b3a535bf3f230.png",
];

var version = "v2.0.2";
const Static_Cache = `Static - ${version}`;
const Dynamic_Cache = `Dynamic - ${version}`;
const Dynamic_Cache_Limits = 100;
const ICON = "./icons/icon120.png";
const NAME = "Nutri-AI";
let isOnline = true;

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(Static_Cache).then(function (cache) {
            return cache.addAll(urlsToPrefetch);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys
                    .filter(function (key) {
                        return (
                            !key.startsWith(Static_Cache) &&
                            !key.startsWith(Dynamic_Cache)
                        );
                    })
                    .map(function (key) {
                        return caches.delete(key);
                    })
            );
        })
    );
});

self.addEventListener("online", () => {
    isOnline = true;
});

self.addEventListener("offline", () => {
    isOnline = false;
});

// self.addEventListener("fetch", (evt) => {
//     evt.respondWith(
//         caches
//             .match(evt.request)
//             .then((cacheRes) => {
//                 const isAPI = evt.request.url.includes("/api/");
//                 const isAdminAPI = evt.request.url.includes("/admin");
//                 return (
//                     (isValidCachedRes(cacheRes) && cacheRes) ||
//                     fetch(evt.request).then(async (fetchRes) => {
//                         if (
//                             (isAPI &&
//                                 !isAdminAPI &&
//                                 evt.request.method === "GET") ||
//                             !isAPI
//                         ) {
//                             // Open Cache
//                             const cache = await caches.open(Dynamic_Cache);

//                             // Update response headers with fetched time
//                             const copy = fetchRes.clone();
//                             var headers = new Headers(copy.headers);

//                             headers.append("sw-fetched-on", new Date());
//                             copy.blob().then(function (body) {
//                                 return cache.put(
//                                     fetchRes,
//                                     new Response(body, {
//                                         status: copy.status,
//                                         statusText: copy.statusText,
//                                         headers: headers,
//                                     })
//                                 );
//                             });
//                             // check cached items size
//                             limitCacheSize(cache);
//                         }
//                         return fetchRes;
//                     })
//                 );
//             })
//             .catch((err) => {
//                 console.log("err:", err);
//                 if (!evt.request.url.includes("/api/")) {
//                     return new Response.redirect("/offline");
//                 }
//             })
//     );
// });

self.addEventListener("push", (event) => {
    const dts = Math.floor(Date.now());

    const options = {
        body: event.data.text(),
        icon: ICON,
        badge: ICON,
        tag: "Nutri-AI-Notify",
        actions: [
            {
                action: "message",
                type: "button",
                title: "test3",
            },
            {
                action: "view",
                type: "button",
                title: "view article",
                icon: "./icons/icon32.png",
            },
            {
                action: "close",
                type: "button",
                title: "close",
            },
        ],
        data: {
            url: "http://localhost:3000/meals",
        },

        timestamp: dts,
    };

    console.log(self.Notification.maxActions);
    event.waitUntil(sendNotification());

    function sendNotification() {
        if (Notification.permission === "granted")
            self.registration.showNotification(NAME, options);
        else if (Notification.permission === "denied")
            console.log(
                "Notification can't be sent to user (permission is required)"
            );
    }
});

self.addEventListener("notificationclick", (event) => {
    const notificationData = event.notification.data;

    console.log(event.action);
    switch (event.action) {
        case "view":
            viewAction(notificationData);
        default:
            event.notification.close();
    }

    event.notification.close();
});

function limitCacheSize(cache) {
    cache.keys().then(function (keys) {
        if (keys.length > Dynamic_Cache_Limits) {
            cache.delete(keys[0]);
        }
    });
}

function viewAction(notificationData) {
    if (notificationData.url) {
        clients.openWindow(notificationData.url);
    }
}

function isValidCachedRes(response) {
    if (response) {
        const now = new Date();
        const resDate = new Date(response.headers.get("sw-fetched-on"));

        const differenceMs = now - resDate;

        // Convert milliseconds to days
        const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

        return !isOnline || differenceDays >= 0.9;
    } else return false;
}
