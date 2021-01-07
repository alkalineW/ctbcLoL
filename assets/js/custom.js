//- invoke kv slider
$(".horz-card-slider-wrap").slick({
	autoplay: true,
	// autoplaySpeed: 800,
	centerMode: true,
	infinite: true,
	arrows: false,
	centerPadding: "32px",
	slidesToShow: 9,
	// added for smooth scrolling
	autoplaySpeed: 800,
	speed: 600,
	pauseOnFocus: false,
	pauseOnHover: false,
	responsive: [
		{
			breakpoint: 1600,
			settings: {
				centerPadding: "26px",
				slidesToShow: 8,
			},
		},
		{
			breakpoint: 1280,
			settings: {
				centerPadding: "20px",
				slidesToShow: 6,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
			},
		},
		{
			breakpoint: 576,
			settings: {
				centerPadding: "10px",
				slidesToShow: 3,
			},
		},
	],
});

//-invoke card-intro-slider
$("#hero-slider").slick({
	adaptiveHeight: true,
	cssEase: "linear",
	infinite: false,
	// fade: true,
	// infinite: true,
	speed: 500,
});

$("#puro-slider").slick({
	adaptiveHeight: true,
	cssEase: "linear",
	infinite: false,
	// fade: true,
	// infinite: true,
	speed: 500,
});

$("#classic-slider").slick({
	adaptiveHeight: true,
	cssEase: "linear",
	infinite: false,
	// fade: true,
	// infinite: true,
	speed: 500,
});

//- invoke limit-sec slider
$(".limit-inner-wrap").slick({
	autoplay: false,
	infinite: true,
	slidesToShow: 2,
	dots: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			},
		},
	],
});

//-invoke recommend slide
$(".recommend-mobile-slider").slick({
	slidesToShow: 1,
	dots: true,
});

//-if the viewport less than 992px, invoke gift-sec left & gaming slider
var matchRule = window.matchMedia("(max-width: 992px)");
//-if the viewport less than 576px, invoke slogan trimed
var mobileMatch = window.matchMedia("(max-width:576px)");

function changeSlogan(e) {
	var additionalSlogan = document
		.querySelector(".kv-section .slogan");
	var slogan = document.querySelectorAll('.sec-slogan');
	if (e.matches) {
		slogan.forEach(function (elm) {
			if (elm.innerText.split('').length < 10) {
				return;
			} else {
				var orginalContext = elm.innerHTML;
				var newContext;
				if (orginalContext.includes('場') && !orginalContext.includes('<br>')) {
					newContext = orginalContext.replace(/場/, '場<br>');
				} else if (orginalContext.includes('，')) {
					newContext = orginalContext.replace(/，/, '<br>');
				}
				elm.innerHTML = newContext;
			}
		});
		additionalSlogan.innerHTML = ('獨家英雄授權卡面任你選<br>最高再享<span class="big">10</span>%現金回饋');
	}
}

function fitScreenInvokeSlider(e) {
	var nuAccountCol = $(".gift-inner-left .nu-account-col");
	var nuAccountWrap = $(".gift-inner-left .nu-account-wrap");
	var nuAccountColImg = $(".gift-inner-left .nu-account-col img");
	var gamingList = $(".gaming-list");

	if (e.matches) {
		nuAccountWrap.removeClass("three-col");
		nuAccountCol.css({ "max-width": "unset" });
		nuAccountColImg.css({ "max-width": "260px", margin: "auto" });

		$(".gift-inner-left .single-col-up").css({ right: 0 });
		nuAccountWrap.slick({
			autoplay: false,
			slidesToShow: 1,
			dots: true,
		});
		gamingList.slick({
			autoplay: false,
			slidesToShow: 1,
			dots: true,
		});
	} else {
		// 新戶好禮 slider
		if (nuAccountWrap.hasClass("slick-initialized")) {
			nuAccountWrap.slick("unslick");
			nuAccountWrap.addClass("three-col");
		}
		// 尊寵禮遇 slider
		if (gamingList.hasClass("slick-initialized")) {
			gamingList.slick("unslick");
		}
	}
}

fitScreenInvokeSlider(matchRule);
changeSlogan(mobileMatch);


//-collapse dropdown menu when click outside of dropdown menu
// when click outer area close navbar-icon-bar and make navbar-icon-bar's style back to close status
$("body").click(function (evt) {
	if ($(evt.target).closest(".navbar").length) {
		return;
	} else {
		$(".collapse").collapse("hide");
		$(".navbar-icon-bar").removeClass("open");
	}
});

//-nav menu animation
var navbarToggler = document.getElementById("navbar-toggler");

function menuIconAnimate() {
	var targetDOM = $(".navbar-icon-bar");
	if ($(".navbar-collapse").hasClass("show")) {
		targetDOM.removeClass("open");
	} else {
		targetDOM.addClass("open");
	}
}

navbarToggler.addEventListener("click", menuIconAnimate);


//-cardParaph trim
var cardParagh = document.querySelectorAll(".card-paraph");
var tabletRule = window.matchMedia("(max-width:768px)");

function replaceParaph(e) {
	if (e.matches) {
		for (var i = 0, l = cardParagh.length; i < l; i++) {
			trimedParaph(cardParagh[i], i);
		}
	}
}

replaceParaph(tabletRule);


function trimedParaph(elm, index) {
	var nameArray = ["伊澤瑞爾", "嘉文四世", "雷玟", "阿璃", "悠咪", "拉克絲", "艾希", "李星", "劫", "提摩", "普羅", "普羅", "RGB", "搖桿"];
	var splitedP = elm.innerText.trim().split('', 12);
	var filterdP = splitedP.filter(function (e) {
		return /\S/.test(e)
	});

	var joinedP = filterdP.join('');
	var nuParagraph;
	// 1.paragraph that not contains name 
	// 2.paragph contains name & name is the first letter of paraph 
	// 3.paragph contains name but not first letter of paraph
	if (joinedP.indexOf(nameArray[index]) === -1) {
		// trimed out name's length
		nuParagraph = joinedP.substr(0, joinedP.length - nameArray[index].length)
		elm.innerHTML = '<span class="big font-weight-bold">' + nameArray[index] + '</span>' + nuParagraph + "...";
	} else if (joinedP.indexOf(nameArray[index]) === 0) {
		nuParagraph = joinedP.split(nameArray[index])[1];
		elm.innerHTML = '<span class="big font-weight-bold">' + nameArray[index] + '</span>' + nuParagraph + "...";
	} else {
		nuParagraph = joinedP.substr(0, joinedP.length - nameArray[index].length)
		elm.innerHTML = '<span class="big font-weight-bold">' + nameArray[index] + '</span>' + nuParagraph + "...";
	}
}

//- verify if ie or not( if is ie invoke "addListener")
function msieversion() {
	var isIe = !!window.MSInputMethodContext && !!document.documentMode;
	if (isIe === true) {
		matchRule.addListener(fitScreenInvokeSlider);
		tabletRule.addListener(replaceParaph);
		mobileMatch.addListener(changeSlogan);
	}
	else {
		matchRule.addEventListener("change", fitScreenInvokeSlider);
		tabletRule.addEventListener("change", replaceParaph);
		mobileMatch.addEventListener("change", changeSlogan);
	}
	return false;
}
msieversion();