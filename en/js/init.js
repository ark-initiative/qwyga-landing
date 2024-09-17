/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.7
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).reframe=t()}(this,function(){"use strict";return function(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n)||-1<r.style.width.indexOf("%"))){var d=(r.getAttribute("height")||r.offsetHeight)/(r.getAttribute("width")||r.offsetWidth)*100,f=document.createElement("div");f.className=n;var s=f.style;s.position="relative",s.width="100%",s.paddingTop=d+"%";var a=r.style;a.position="absolute",a.width="100%",a.height="100%",a.left="0",a.top="0",r.parentNode.insertBefore(f,r),r.parentNode.removeChild(r),f.appendChild(r)}}}});

// Handle responsive video embeds
window.addVideoEmbedsHandlers = function() {
	reframe('iframe[src*="youtube.com"],iframe[src*="vimeo.com"]');
};

window.removeVideoEmbedsHandlers = function() {
	const frameWrappers = document.querySelectorAll('.js-reframe');
	if (frameWrappers) {
		for (let i = 0; i < frameWrappers.length; i += 1) {
			const frameWrapper = frameWrappers[i];
			const frame = frameWrapper.firstChild;
			frame.removeAttribute('style');
			frameWrapper.parentNode.insertBefore(frame, frameWrapper);
			frameWrapper.parentNode.removeChild(frameWrapper);
		}
	}
};

// Handle main navigation menu toggling on small screens
function navToggleHandler(e) {
	e.preventDefault();
	document.body.classList.toggle('js-nav-open');
}

window.addMainNavigationHandlers = function() {
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].addEventListener('click', navToggleHandler, false);
		}
	}
};

window.removeMainNavigationHandlers = function() {
	document.body.classList.remove('js-nav-open');
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].removeEventListener('click', navToggleHandler, false);
		}
	}
};

// Handle announcement close button click
const hasLocalStorage = (function() {
	try {
		localStorage.setItem('__test', true);
		localStorage.removeItem('__test');
		return true;
	} catch (exception) {
		return false;
	}
}());

function announcementCloseHandler(e) {
	e.preventDefault();
	const anncmnt = document.querySelector('.js-announcement');
	const anncmntKey = 'hide-announcement-bar';
	const currentAnncmnt = anncmnt.dataset.anncmntId;
	anncmnt.classList.add('is-hidden');
	if (hasLocalStorage) {
		localStorage.setItem(anncmntKey, currentAnncmnt);
	}
}

window.addAnnouncementHandlers = function() {
	const anncmnt = document.querySelector('.js-announcement');
	if (anncmnt) {
		const anncmntClose = document.querySelector('.js-announcment-close');
		const anncmntKey = 'hide-announcement-bar';
		const currentAnncmnt = anncmnt.dataset.anncmntId;
		if (hasLocalStorage) {
			if (localStorage.getItem(anncmntKey) != currentAnncmnt ) {
				anncmnt.classList.remove('is-hidden');
			}
		}
		anncmntClose.addEventListener('click', announcementCloseHandler, false);
	}
};

window.removeAnnouncementHandlers = function() {
	const anncmnt = document.querySelector('.js-announcement');
	if (anncmnt) {
		const anncmntClose = document.querySelector('.js-announcment-close');
		const anncmntKey = 'hide-announcement-bar';
		const currentAnncmnt = anncmnt.dataset.anncmntId;
		if (hasLocalStorage) {
			if (localStorage.getItem(anncmntKey) == currentAnncmnt ) {
				anncmnt.classList.add('is-hidden');
			}
		}
		anncmntClose.removeEventListener('click', announcementCloseHandler, false);
	}
};

// Accordion
var faqAccordions = document.querySelectorAll('.handorgel');
Array.from(faqAccordions).forEach((faqAccordion) => {
  var accordion = new handorgel(faqAccordion, {
    multiSelectable: true
})
});

/*
var language = window.navigator.userLanguage || window.navigator.language;
//alert(language);
if( language !== "de-DE" && !window.location.pathname.startsWith("/en/") ){
	console.log("Will re-direct to English page!");
	//console.log(window.location.origin);
	window.location.replace(window.location.origin + "/en" + window.location.pathname );
}
*/

const queryString = window.location.search;
//console.log(queryString);
if( queryString.includes("campaign=") ){
	const campaign_id = queryString.split("campaign=")[1];
	console.log("Campaign ID is:", campaign_id); // or campaign name ?

	var links, i, le;
	links = document.getElementsByTagName('a');
	for (i = 0, le = links.length; i < le; i++) {
		if(links[i].href.startsWith("https://apps.apple.com") && !links[i].href.startsWith("https://apps.apple.com/account")){
			//links[i].href = "http://www.mysite.com/?redirect=" + encodeURIComponent(links[i].href);
			console.log("Apple link:", links[i]); // should replace "ct="
			console.log(links[i].href.split("LandingPage"))
			const split = links[i].href.split("LandingPage");
			links[i].href = split[0] + campaign_id + split[1];
		}
		else if(links[i].href.startsWith("https://play.google.com/store/apps")){
			console.log("Google link:", links[i]);
			const split = links[i].href.split("&referrer=");
			console.log(split)
			//links[i].href = links[i].href + "&referrer=" + campaign_id;
			links[i].href = split[0] + "&referrer=utm_source=facebook&utm_medium=social&utm_campaign=" + campaign_id;
		}
	}
}