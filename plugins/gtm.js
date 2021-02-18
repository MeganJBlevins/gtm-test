/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side
  */
  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start':
        new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'G-96ZL1EVKG2');
}

/* Since we're using virtual pageviews, disable your GTM normal pageview tag, it will fire on first load causing a duplicate with the virtual one fired from the router */