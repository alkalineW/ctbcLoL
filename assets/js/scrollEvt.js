//- Math.floor function
function MathFloor(val) {
	return Math.floor(val);
}

function addClass(e, className) {
	e.classList.add(className);
}

//- 上方選單滑到指定區塊加class
// when html loaded already, invoke this..(get dom's top/height)
window.onload = function () {
	var navList = [
		"hero-intro-wrap",
		"bonus-sec",
		"gift-sec",
		"limit-sec",
		"gaming-sec",
	];

	// 跟選單發亮有關的東西
	var navListDom = document.querySelectorAll("#navbarCollapse .nav-item");
	var mobileNavListDom = document.querySelectorAll(".mobile-nav .nav-item");
	var navItemPosYData = [];
	//- navLink
	// var navLink = document.getElementsByClassName("nav-link");
	var navItem = document.getElementsByClassName("nav-item");

	//- back to top
	var backToTop = document.querySelectorAll(".back-to-top");

	//- 卡片介紹內的led
	var ledAniImg = document.querySelector(
		".hero-intro-wrap .led img:nth-of-type(2)"
	);
	//- led 的 啟動目標 同時也關掉 側邊立即申辦 的 啟動目標
	var heroIntroWrap = document.getElementById("hero-intro-wrap");

	// 手機下選單的目標
	var rightCardIntro = document.getElementsByClassName("right-intro")[0];

	// 用來啟動 limitDateImg 旋轉的目標
	var limitWrap = document.getElementById("limit-inner-wrap");
	// 旋轉的 limitDateImg // 複數 nodeList
	var limitDateImg = document.querySelectorAll(
		".limit-col .limit-date img:nth-of-type(2)"
	);

	// 手機的 bottom menu
	var mobileNav = document.getElementsByClassName("mobile-nav")[0];
	var sideApply = document.getElementById("side-apply");

	var innerHeight = window.innerHeight;

	function navLinkScroll() {
		var isClicked = false; // set isScrolling flag prevent mutiple scroll evt
		for (var i = 0, l = navItem.length; i < l; i++) {
			navItem[i].addEventListener("click", function () {
				// evt.preventDefault();
				isClicked = true;
				if (isClicked) {
					var anchorTarget = "#" + $(this).attr("data-target");
					var targetDOM = $(anchorTarget);
					var targetDOMPosY;
					// if ($(this).attr("data-target") === "hero-intro-wrap") {
					// 	targetDOMPosY = targetDOM.offset().top - 8;
					// } else {}
					targetDOMPosY = targetDOM.offset().top - 45; // minus top-nav-menu height

					// close top-nav when click sub-items
					$(".collapse").collapse("hide");
					$(".navbar-icon-bar").removeClass("open");

					$("html , body").animate(
						{ scrollTop: targetDOMPosY },
						800,
						function () {
							isClicked = false;
						}
					);
				}
			});
		}
	}

	function getBoundingOfDom() {
		navList.forEach(function (navListItem) {
			var elementHeight = MathFloor(
				document.getElementById(navListItem).getBoundingClientRect()
					.height
			);
			var elementPosY = MathFloor($("#" + navListItem).offset().top);

			var elementBoundY = elementPosY + elementHeight;
			// console.log(
			//     navListItem,
			//     elementPosY,
			//     elementHeight,
			//     elementBoundY
			// );
			navItemPosYData.push({
				domId: navListItem,
				entryY: elementPosY,
				leaveY: elementBoundY,
			});
			// console.log(navItemPosYData);
		});
	}

	// 如果滑動距離小於第一個添加的目標 全數的 navListDom 都移除 active class
	function resetAllActiveStatus(domList) {
		domList.forEach(function (eachItem) {
			eachItem.classList.remove("active");
		});
	}

	// add active class to nav that name fits
	function addActiveToTargetNav(domList, arrivedSecName) {
		domList.forEach(function (eachDom) {
			if (eachDom.dataset.target === arrivedSecName) {
				eachDom.classList.add("active");
			} else {
				eachDom.classList.remove("active");
			}
		});
	}

	//- scroll back top
	function showScrollBackToTop(scrollValue) {
		if (scrollValue > 1200) {
			backToTop[1].style.opacity = "1";
		} else {
			backToTop[1].style.opacity = "0";
		}
	}

	function arrivedAndTotallyLeave(triggerElement, targetElement) {
		var triggerElement = triggerElement;
		var targetElement = targetElement;
		var triggerElementData = triggerElement.getBoundingClientRect();

		// if (totallyLeaveRule) {
		// 	console.log(`distance to triggerElement.top: ${MathFloor(triggerElementData.top)} triggerElement height: ${MathFloor(triggerElementData.height)} innerHeight: ${innerHeight}`);
		// }
		if (targetElement.length > 1) {
			// 觸發元素出現在螢幕內的情況
			if (MathFloor(triggerElementData.top) <= innerHeight) {
				targetElement.forEach(function (e) {
					addClass(e, "active");
				});
			}
			// 到觸發元素底下去的情況
			if (
				MathFloor(triggerElementData.top) < 0 &&
				Math.abs(triggerElementData.top) >=
					MathFloor(triggerElementData.height)
			) {
				targetElement.forEach(function (e) {
					rmClass(e, "active");
				});
			}
			// 往回滑
			if (
				MathFloor(triggerElementData.top) >= innerHeight &&
				MathFloor(triggerElementData.top) > 0
			) {
				targetElement.forEach(function (e) {
					rmClass(e, "active");
				});
			}
		} else {
			// 觸發元素出現在螢幕內的情況
			if (MathFloor(triggerElementData.top) <= innerHeight) {
				targetElement.classList.add("active");
			}
			// 到觸發元素底下去的情況
			if (
				MathFloor(triggerElementData.top) < 0 &&
				Math.abs(triggerElementData.top) >=
					MathFloor(triggerElementData.height)
			) {
				targetElement.classList.remove("active");
			}
			// 往回滑
			if (
				MathFloor(triggerElementData.top) >= innerHeight &&
				MathFloor(triggerElementData.top) > 0
			) {
				targetElement.classList.remove("active");
			}
		}
	}

	getBoundingOfDom();
	navLinkScroll();

	// ***先把滑動到要觸發的 function 都拉出來 寫成獨立console 才能抓規則***
	// 手機選單 只要 rightCardInfo 出現在螢幕 就不顯示 mobileNav
	function mobileAction() {
		arrivedAndTotallyLeave(rightCardIntro, mobileNav, true);
		arrivedAndTotallyLeave(heroIntroWrap, sideApply);
	}

	// jumping-icon control
	function jumpingIconAction() {
		var jumpingIcon = document.getElementsByClassName(
			"jumping-icon-col"
		)[0];
		var jumpingIconTop = MathFloor(jumpingIcon.getBoundingClientRect().top);
		var jumpingIconHeight = MathFloor(
			jumpingIcon.getBoundingClientRect().height
		);

		var triggerItemData = document
			.querySelector(".kv-section .slogan")
			.getBoundingClientRect();
		var triggerItemTop = MathFloor(triggerItemData.top);
		var triggerItemHeight = MathFloor(triggerItemData.height);

		// console.log(
		// 	`trigger top: ${triggerItemTop}
		// 	trigger height: ${triggerItemHeight}
		// 	innerHeight:${innerHeight}
		// 	targetHeight:${jumpingIconHeight}
		// 	jumpingIconTop:${jumpingIconTop}
		// 	`
		// );
		if (triggerItemTop > innerHeight) {
			jumpingIcon.classList.remove("active");
		}
		if (triggerItemTop < innerHeight - triggerItemHeight) {
			jumpingIcon.classList.add("active");
		}
		if (jumpingIconTop < 0 && jumpingIconTop * -1 < jumpingIconHeight) {
			jumpingIcon.classList.remove("active");
		}
	}

	function cardIntroAction() {
		arrivedAndTotallyLeave(heroIntroWrap, ledAniImg);
		// 這裡的金線動態專屬 第一次滑入到 heroIntroWrap 觸發credit1的動態
		var heroTitleLeft = document.querySelector(".hero-title-col");
		var heroTitleRight = document.querySelector(
			".hero-title-col.apply-now"
		);

		arrivedAndTotallyLeave(heroIntroWrap, heroTitleLeft);
		arrivedAndTotallyLeave(heroIntroWrap, heroTitleRight);
	}

	$(window).scroll(function () {
		var scrollTop = $(document).scrollTop();
		var reallyScroll = scrollTop + 50; // nav 's height ??? 不確定是否用到

		showScrollBackToTop(scrollTop);
		$("#mobile-nav-drop").collapse("hide");

		mobileAction();
		jumpingIconAction();
		cardIntroAction();
		arrivedAndTotallyLeave(limitWrap, limitDateImg);

		// close top-nav when click sub-items
		$(".collapse").collapse("hide");
		$(".navbar-icon-bar").removeClass("open");

		for (var i = 0; i < navItemPosYData.length; i++) {
			var arrivedSecName = navItemPosYData[i].domId;
			if (
				reallyScroll >= navItemPosYData[i].entryY &&
				reallyScroll < navItemPosYData[i].leaveY
			) {
				// console.log("arrived " + arrivedSecName);
				addActiveToTargetNav(navListDom, arrivedSecName);
				addActiveToTargetNav(mobileNavListDom, arrivedSecName);
			} else if (reallyScroll <= navItemPosYData[0].entryY) {
				resetAllActiveStatus(navListDom);
				resetAllActiveStatus(mobileNavListDom);
			}
		}
	});
	backToTop.forEach((elm) => {
		elm.addEventListener("click", function () {
			$("html , body").animate({ scrollTop: 0 }, "slow");
		});
	});
};

// mobile scrolled down will fire resize evt
var cachedWidth = $(window).width();
$(window).resize(function () {
	var newWidth = $(window).width();
	if (newWidth !== cachedWidth) {
		//DO RESIZE HERE
		cachedWidth = newWidth;
		location.reload();
		return false;
	}
});
