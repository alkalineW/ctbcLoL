// old browser do NOT support nodeList.forEach()!!!
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

//- global variable
var currentGenre = "hero"; // default showed hero-switcher & hero-slider

var genreList = document.querySelectorAll(".genre-switcher li");
var roundSwitcher = document.querySelectorAll(".round-switcher");
var switcherItem = document.querySelectorAll(".switcher-item");

var cardSlider = document.querySelectorAll(".card-slider");

//- prepend / append fake button & bind event to fake button
cardSlider.forEach((elm, i) => {
	let fakeArrowNext = document.createElement("button");
	let fakeArrowPrev = document.createElement("button");
	fakeArrowNext.addEventListener("click", () => {
		if (i === 0) {
			showCorrespond("puro", 0, "credit6");
		} else if (i === 1) {
			showCorrespond("classic", 0, "credit7");
		} else {
			showCorrespond("hero", 0, "credit1");
		}
	});
	fakeArrowPrev.addEventListener("click", () => {
		if (i === 0) {
			showCorrespond("classic", 1, "debit7");
		} else if (i === 1) {
			showCorrespond("hero", 9, "debit5");
		} else {
			showCorrespond("puro", 1, "debit6");
		}
	});
	fakeArrowNext.classList.add("fake-arrow-next", "fake-arrow");
	fakeArrowPrev.classList.add("fake-arrow-prev", "fake-arrow");
	elm.append(fakeArrowNext);
	elm.prepend(fakeArrowPrev);
});

//- function that show correspond roundSwitcher / cardSlider & slide to slide
function showCorrespond(genre, slideNum, sliderBg) {
	console.log(`showCorrespond ${genre} ${sliderBg} `);
	toggleShowedParts(roundSwitcher, genre, sliderBg);
	toggleShowedParts(cardSlider, genre, sliderBg);
	currentGenre = genre; // set currentGenre from parmeter
	$("#" + genre + "-slider").slick("slickGoTo", slideNum);

	genreList.forEach((elm) => {
		findCorrespondElm(elm, elm.dataset.genre, currentGenre, "active-genre");
	});
}

//- hozcard switch to specific card intro
function hozSlickTo() {
	var horzCard = document.getElementsByClassName("horz-card");
	for (var i = 0, l = horzCard.length; i < l; i++) {
		horzCard[i].addEventListener("click", function () {
			// this =  horzCard[i] itself
			var slideData = this.dataset.slide.split("-");
			var genre = slideData[0];
			var slideId = slideData[slideData.length - 1];

			// scroll to card-intro section
			$("html , body").animate(
				{ scrollTop: $("#hero-intro-wrap").offset().top - 45 },
				800,
				function () {
					isClicked = false;
				}
			);

			// 控制 roundSwitcher 跟 cardSlider 隨傳入的種類顯示
			toggleShowedParts(roundSwitcher, genre, slideId);
			toggleShowedParts(cardSlider, genre, slideId);
			resetTitleStatus();

			// slick to specific slide // 這段ok
			$("#" + genre + "-slider").slick("slickGoTo", slideId);

			genreList.forEach(function (elm) {
				findCorrespondElm(
					elm,
					elm.dataset.genre,
					genre,
					"active-genre"
				);
			});
		});
	}
}

hozSlickTo();

//- change slide bg
function changeBg(activeSlide) {
	var bgTargetElm = $("#hero-intro-wrap");
	var posX, bgIndex, offsetPosX;
	var slideNum = activeSlide.slice(-1) * 1;
	var isCredit = /^c/g;

	// credit 1-5 & debit 1-5
	if (slideNum < 6) {
		activeSlide.match(isCredit)
			? (bgIndex = (slideNum - 1) * -1)
			: (bgIndex = (slideNum + 4) * -1);
	}
	// credit6 & debit6
	else if (slideNum == 6) {
		activeSlide.match(isCredit)
			? (bgIndex = (slideNum + 4) * -1)
			: (bgIndex = (slideNum + 5) * -1);
	} else {
		// credit7
		activeSlide.match(isCredit)
			? (bgIndex = (slideNum + 5) * -1)
			: (bgIndex = (slideNum + 6) * -1);
	}

	if ($(window).width() < 576) {
		// 若螢幕小於576的修正值
		offsetPosX = ((630 - window.innerWidth) / 2) * 1;
		posX = 630 * bgIndex - offsetPosX;
	} else {
		// 若螢幕小於1920的修正值
		offsetPosX = ((1920 - window.innerWidth) / 2) * 1;
		posX = 1920 * bgIndex - offsetPosX;
	}
	bgTargetElm.css({
		backgroundPositionX: posX,
	});
	console.log(`change bg to :${activeSlide}`);
}

// changeSlideHandler bind to ".card-slider" itself
// 從 this 出發找 active-slide 這樣抓 current-slide 的 id 換背景才不會有問題
function changeSlideHandler() {
	var activeSlideId;
	console.log(currentGenre);
	this.id.slice("-")[0] === currentGenre
		? (activeSlideId = this.querySelector("#hero-intro-wrap .slick-active")
			.id)
		: (activeSlideId = document.querySelector(
			"#" + currentGenre + "-slider .slick-active"
		).id);
	$("#" + activeSlideId + " .hero-title-col").addClass("active");
	changeBg(activeSlideId);
	activeSwitcher(activeSlideId);
}

function resetTitleStatus() {
	var heroTitleCol = document.getElementsByClassName("hero-title-col");
	for (let item of heroTitleCol) {
		item.classList.remove("active");
	}
}

$(".card-slider").on("afterChange", function () {
	changeSlideHandler.call(this, this, currentGenre);
	//--test
	// checkIfEndOfSlide(currentGenre);
});

$(".card-slider").on("beforeChange", function () {
	resetTitleStatus();
});

function toggleShowedParts(targetDom, invokeGenre, forceSlideId) {
	targetDom.forEach(function (eachElm) {
		var genre = eachElm.id.split("-")[0];
		var currentSlideId;

		// 如果項目的 id 與 傳入的 genre 相同,移除隱藏 class
		if (genre === invokeGenre) {
			console.log(`invokeGenre/${invokeGenre} genre/${genre} `);
			currentGenre = invokeGenre; // 對當下的 currentGenre 賦予新值
			eachElm.classList.remove("hide");

			// 在 card-slider 元素中
			if ($(eachElm).hasClass("card-slider")) {
				if (!forceSlideId) {
					// 如果 forceId 為 false 就選取 card-slider 含有 .slick-active 的 id
					currentSlideId = eachElm.childNodes[5].querySelector(
						".slick-active"
					).id;
					console.log(
						`forceSlideId: ${forceSlideId} / currentSlideId ${currentSlideId}`
					);
					activeSwitcher(currentSlideId);
					changeBg(currentSlideId);
				} else {
					currentSlideId = forceSlideId;
					console.log(`forceSlideId:${currentSlideId}`);
					activeSwitcher(currentSlideId);
					changeBg(currentSlideId);
				}
			}
		} else {
			eachElm.classList.add("hide");
			return;
		}
	});
}

// 初始時顯示的是 第一組 roundSwitcher + hero-slider
toggleShowedParts(roundSwitcher, currentGenre, false);
toggleShowedParts(cardSlider, currentGenre, false);

function findCorrespondElm(elm, compareVal, parameterVal, className) {
	if (compareVal === parameterVal) {
		elm.classList.add(className);
	} else {
		elm.classList.remove(className);
	}
}

// 每一次換 slider 組別
genreList.forEach(function (eachGenre) {
	eachGenre.addEventListener("click", function () {
		invokeGenre = this.dataset.genre;
		genreList.forEach(function (genre) {
			findCorrespondElm(
				genre,
				genre.dataset.genre,
				invokeGenre,
				"active-genre"
			);
		});
		resetTitleStatus();
		toggleShowedParts(roundSwitcher, invokeGenre, false);
		toggleShowedParts(cardSlider, invokeGenre, false);

		// 每次換組 對該組內所有 slide 金線 active
		$("#" + invokeGenre + "-slider .hero-title-col").addClass("active");
	});
});

switcherItem.forEach(function (eachItem) {
	eachItem.addEventListener("click", function () {
		var slideGenre = $(this).parent().parent().attr("id").split("-")[0];
		var currentSlide = $(this).index();

		console.log(`${slideGenre}  ${currentSlide}`);
		if ($(this).hasClass("active")) {
			console.log("already has active class");
			return;
		} else {
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
		}

		// 因為中間的裝飾占掉一個 index 所以要扣回去
		if (slideGenre === "hero" && currentSlide >= 6) {
			$("#" + slideGenre + "-slider").slick(
				"slickGoTo",
				currentSlide - 1
			);
		} else if (slideGenre != "hero" && currentSlide >= 2) {
			console.log(`switcherItem: ${slideGenre}`);
			$("#" + slideGenre + "-slider").slick(
				"slickGoTo",
				currentSlide - 1
			);
		} else {
			console.log(`switcherItem: ${slideGenre}`);
			$("#" + slideGenre + "-slider").slick("slickGoTo", currentSlide);
		}
	});
});

function activeSwitcher(id) {
	switcherItem.forEach(function (elm) {
		findCorrespondElm(elm, elm.dataset.slide, id, "active");
	});
}

// function checkIfEndOfSlide(genreG) {
// 	var targetElm = document.getElementById(genreG + "-slider");
// 	// console.log(targetElm);
// 	// targetElm.addEventListener("swiped-right", rightSwipe);
// 	targetElm.addEventListener(
// 		"swiped-right",
// 		function rightSwipe(e) {
// 			e.currentTarget.removeEventListener(e.type, rightSwipe, false);
// 			var slickArrowPrev = document.querySelector("#" + genreG + "-slider" + " .slick-prev");
// 			var slickArrowNext = document.querySelector("#" + genreG + "-slider .slick-next");
// 			if (slickArrowPrev.classList.contains("slick-disabled") && !slickArrowNext.classList.contains("slick-disabled")) {
// 				// alert(`prev contains disable & next not contains disable`);
// 				if (genreG == "hero") {
// 					showCorrespond("classic", 1, "debit7");
// 				} else if (genreG === "puro") {
// 					showCorrespond("hero", 9, "debit5");
// 				} else {
// 					showCorrespond("puro", 1, "debit6");
// 				}
// 			} else {
// 				return false;
// 			}
// 		},
// 		{ once: true }
// 	);

// 	targetElm.addEventListener(
// 		"swiped-left",
// 		function leftSwipe(e) {
// 			e.currentTarget.removeEventListener(e.type, leftSwipe, false);
// 			var slickArrowNext = document.querySelector("#" + genreG + "-slider" + " .slick-next");
// 			var slickArrowPrev = document.querySelector("#" + genreG + "-slider .slick-prev");
// 			// alert(`slickArrowNext:${i}`);
// 			if (slickArrowNext.classList.contains("slick-disabled") && !slickArrowPrev.classList.contains("slick-disabled")) {
// 				if (genreG == "hero") {
// 					showCorrespond("puro", 0, "credit6");
// 				} else if (genreG === "puro") {
// 					showCorrespond("classic", 0, "credit7");
// 				} else {
// 					showCorrespond("hero", 0, "credit1");
// 				}
// 			} else {
// 				return false;
// 			}
// 		}, { once: true });
// }

