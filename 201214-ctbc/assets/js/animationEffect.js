"use strict";

// old browser do NOT support nodeList.forEach()!!!
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

function rmClass(o, c) {
	o.classList.remove(c)
}

function keyVisualPopup() {
	var cardElm = document.querySelectorAll(".ch-card");
	cardElm.forEach(function (e) {
		rmClass(e, 'op');
	});

	gsap.fromTo("#left-ch .ch-card", { opacity: 0, x: -300 }, { duration: 1, x: 0, opacity: 1 });
	gsap.fromTo("#right-ch .ch-card", { opacity: 0, x: 300 }, { duration: 1, x: 0, opacity: 1 });
}

//- kv staggered in
setTimeout(function () {
	keyVisualPopup();
}, 600);

