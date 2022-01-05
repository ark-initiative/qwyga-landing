function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    // Get an array of cookies
    var arrSplit = document.cookie.split(";");

    for(var i = 0; i < arrSplit.length; i++)
    {
        var cookie = arrSplit[i].trim();
        var cookieName = cookie.split("=")[0];

        // If the prefix of the cookie's name matches the one specified, remove it
        if(cookieName.indexOf(name) === 0) {
            createCookie(cookieName,"",-1);
        }
    }
}

if(readCookie('cookie-notice-dismissed')=='true') {
    if( readCookie('cookies-accepted')=='true' ){
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u="//analytics.qwyga.com/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '2']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
    }
} else {
    document.getElementById('cookie-notice').style.display = 'block';
}
document.getElementById('cookie-notice-accept').addEventListener("click",function() {
    createCookie('cookie-notice-dismissed','true',31);
    createCookie('cookies-accepted','true',31);
    document.getElementById('cookie-notice').style.display = 'none';
    location.reload();
});
document.getElementById('cookie-notice-reject').addEventListener("click",function() {
    createCookie('cookie-notice-dismissed','true',31);
    createCookie('cookies-accepted','false',31);
    eraseCookie('_pk_id',"",-1);
    eraseCookie('_pk_ses',"",-1);
    document.getElementById('cookie-notice').style.display = 'none';
});
document.getElementById('cookie-notice-show').addEventListener("click",function() {
    document.getElementById('cookie-notice').style.display = 'block';
});