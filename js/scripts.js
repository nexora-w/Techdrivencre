// Webflow initialization
!function(o, c) {
    var n = c.documentElement
      , t = " w-mod-";
    n.className += t + "js",
    ("ontouchstart"in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
}(window, document);

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('set', 'developer_id.dZGVlNj', true);
gtag('config', 'G-PQCCYT6JS8');

// Production and signup flow detection
window.IS_PRODUCTION = window.location.host === "fruitful.com" || window.location.host === "my.fruitful.com" || window.location.host === "www.fruitful.com";
window.IS_SIGNUP_FLOW = window.location && window.location.pathname && window.location.pathname.indexOf("/sign-up") === 0;

// Google Tag Manager
(function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0]
      , j = d.createElement(s)
      , dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-M7DQSGB');

// Sentry initialization
window.sentryOnLoad = function() {
    var email = undefined;
    try {
        email = localStorage.getItem("user.signup.email");
    } catch (e) {
        console.error("localStorage not avilable when Sentry was loaded")
    }
    Sentry.init({
        environment: window.IS_PRODUCTION ? "production" : "staging",
        initialScope: {
            tags: {
                "url_host": window.location.host,
                "url_pathname": window.location.pathname,
                "is_signup_flow": window.IS_SIGNUP_FLOW,
            },
            user: {
                email: email
            }
        },
        tracesSampleRate: window.IS_SIGNUP_FLOW ? 1.0 : 0.2,
        tracePropagationTargets: ['fruitful.com'],
        replaysSessionSampleRate: window.IS_PRODUCTION && window.IS_SIGNUP_FLOW ? 0.4 : 0,
        replaysOnErrorSampleRate: window.IS_PRODUCTION ? 1.0 : 0,
        integrations: [Sentry.replayIntegration({
            minReplayDuration: 8000,
            maskAllText: false,
            maskAllInputs: true,
            mask: ['.flow-form__checkbox'],
            blockAllMedia: false,
            block: ['video'],
            networkDetailAllowUrls: ['fruitful.com'],
        }), ],
        beforeSend(event) {
            if (!!navigator.userAgent && /android 7.0/.test(navigator.userAgent.toLowerCase())) {
                return null;
                // ignore these events
            }
            return event;
        },
        ignoreErrors: ["An unknown error occurred when fetching the script.", "the message channel closed before a response was received", "a test mode key was used to make this request", "Invalid promotional code submitted", "The play() request was interrupted", "AbortError: The operation was aborted.", "Can't find variable: mixpanel", "mixpanel is not defined", "The document is sandboxed and lacks the 'allow-same-origin' flag", "The request is not allowed by the user agent or the platform in the current context", "window.webkit.messageHandlers"]
    });
};

// URL parameter persistence function
const persistParamsToRelevantAnchorElements = (e=window.location.href, r=document.querySelectorAll("a")) => {
    const t = []
      , a = new URL(e);
    return "" == a.search ? [] : (r.forEach((e => {
        const r = e.getAttribute("href") || ""
          , s = r.startsWith("/");
        if (s || r.includes(".fruitful.") || r.includes("://fruitful.") || r.includes("fruitful") && r.includes(".webflow.")) {
            const n = s ? new URL(r,a.origin) : new URL(e.href);
            for (let[e,r] of new URLSearchParams(a.searchParams).entries())
                n.searchParams.has(e) || n.searchParams.append(e, r);
            s ? e.setAttribute("href", n.pathname + (n.search || "") + n.hash) : e.href = n.toString(),
            e.setAttribute("data-original-href", r),
            t.push(e)
        }
    }
    )),
    t)
};

const persistParams = () => {
    const modifiedElements = persistParamsToRelevantAnchorElements();
    modifiedElements.length > 0 && console.log(`[Fruitful Webflow] Custom <head> script persisted current url params to ${modifiedElements.length} internal links`);
};

// DOM Content Loaded event listener
document.addEventListener("DOMContentLoaded", () => {
    persistParams();
    const pageElement = document.body.querySelector("div.page-w");
    if (pageElement) {
        const pageMutationObserver = new MutationObserver(persistParams);
        pageMutationObserver.observe(pageElement, {
            childList: true
        });
    }
});

// Google Ads
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'AW-11064535245');

// Webflow currency settings
window.__WEBFLOW_CURRENCY_SETTINGS = {
    "currencyCode": "USD",
    "symbol": "$",
    "decimal": ".",
    "fractionDigits": 2,
    "group": ",",
    "template": "{{wf {\"path\":\"symbol\",\"type\":\"PlainText\"} }} {{wf {\"path\":\"amount\",\"type\":\"CommercePrice\"} }} {{wf {\"path\":\"currencyCode\",\"type\":\"PlainText\"} }}",
    "hideDecimalForWholeNumbers": false
};

// LinkedIn tracking
_linkedin_partner_id = "6406340";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);

(function(l) {
    if (!l) {
        window.lintrk = function(a, b) {
            window.lintrk.q.push([a, b])
        }
        ;
        window.lintrk.q = []
    }
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
})(window.lintrk);
