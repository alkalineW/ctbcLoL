"use strict";

function rmClass(e, className) {
	e.classList.remove(className);
}

//- kv staggered in
setTimeout(function () {
	keyVisualPopup();
}, 600);


function keyVisualPopup() {
	var cardElm = document.querySelectorAll(".ch-card");
	cardElm.forEach(function (e) {
		rmClass(e, 'op');
	});

	gsap.fromTo("#left-ch .ch-card", { opacity: 0, x: -300 }, { duration: 1, x: 0, opacity: 1 });
	gsap.fromTo("#right-ch .ch-card", { opacity: 0, x: 300 }, { duration: 1, x: 0, opacity: 1 });

	// setTimeout(function () {
	// 	var kvSloganWrap = document.getElementsByClassName('kv-slogan-wrap')[0];
	// 	rmClass(kvSloganWrap, 'op');
	// 	gsap.fromTo(".kv-slogan-wrap",
	// 		{ opacity: 0, scale: 3, },
	// 		{
	// 			opacity: 1,
	// 			scale: 1,
	// 			transformOrigin: "center",
	// 			ease: "power4.out",
	// 			duration: 3
	// 		});
	// }, 1500);
}


//   $(function () {
// })
