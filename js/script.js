//Responsive

var mql = window.matchMedia("screen and (max-width: 959px)");
var mediaNarrow = mql.matches;

mql.addListener(function(e) {
	if(e.matches) {
		mediaNarrow = true;
		//Navigation CSS Reset
		let nodeList = document.querySelectorAll(`.submenu-wrapper`);
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].removeAttribute("style");
		}
	} else {
		mediaNarrow = false;
		//Navigation CSS Reset
		let nodeList = document.querySelectorAll(`.submenu > li`);
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].removeAttribute("style");
		}
	}
});


//Submenu SlideDown & SlideUp Animation (Wide Screen)

let currentSubmenu = 1;

function showSubmenu(num) {
	if (!mediaNarrow) {
		document.querySelector(`.submenu-wrapper-${currentSubmenu}`).style.transition = "max-height 0s";	
		document.querySelector(`.submenu-wrapper-${currentSubmenu}`).style.maxHeight = "0px";
		currentSubmenu = num;
		document.querySelector(`.submenu-wrapper-${num}`).style.transition = "max-height 0.5s";
		document.querySelector(`.submenu-wrapper-${num}`).style.maxHeight = "350px";
	}
}

function holdSubmenu() {
	if (!mediaNarrow) {
		document.querySelector(`.submenu-wrapper-${currentSubmenu}`).style.maxHeight = "350px";
	}
}

function removeSubmenu() {
	if (!mediaNarrow) {
		document.querySelector(`.submenu-wrapper-${currentSubmenu}`).style.maxHeight = "0px";
	}
}


//Submenu SlideDown & SlideUp Animation (Narrow Screen)

function showAndRemoveMenu(num) {
	if (mediaNarrow) {
		let nodeList = document.querySelectorAll(`.submenu-wrapper-${num} > div > ul > li.submenu-title`);
		let visible = (nodeList[0].style.height == "50px");
		for (let i = 0; i < nodeList.length; i++) {
			if (!visible) {
				nodeList[i].style.height = "50px";
				nodeList[i].style.borderBottom = "1px solid #222222";
			} else {
				nodeList[i].style.height = "0px";
				nodeList[i].style.borderBottom = "none";
			}
		}
		let naviTitle = document.querySelector(`.submenu-wrapper-${num}`).parentElement;
		if (!visible) {
			naviTitle.classList.remove("navi-open");
			naviTitle.classList.add("navi-close");
		} else {
			naviTitle.classList.remove("navi-close");
			naviTitle.classList.add("navi-open");
			let submenuList = document.querySelectorAll(`.submenu-wrapper-${num} > div > ul`);
			for (let j = 1; j < submenuList.length + 1; j++) {
				if (submenuList[j-1].childNodes[1].classList.contains("submenu-close")) {
					showAndRemoveSubmenu(num, j);
				}
			}
		}
	}
}

function showAndRemoveSubmenu(num1, num2) {
	if (mediaNarrow) {
		let nodeList = document.querySelectorAll(`.submenu-${num1}-${num2} > li`);
		let visible = (nodeList[1].style.height == "35px");
		for (let i = 1; i < nodeList.length; i++) {
			if (!visible) {
				nodeList[i].style.height = "35px";
			} else {
				nodeList[i].style.height = "0px";
			}
		}
		let submenuTitle = document.querySelector(`.submenu-${num1}-${num2} > li.submenu-title`);
		if (!visible) {
			submenuTitle.classList.remove("submenu-open");
			submenuTitle.classList.add("submenu-close");
		} else {
			submenuTitle.classList.remove("submenu-close");
			submenuTitle.classList.add("submenu-open");
		}
	}
}


//Navigation Bar SearchBox Animation (Wide Screen)

document.querySelector('.headerlink > li:nth-child(5) > a').addEventListener('click', function() {
	document.querySelector('.headerlink > li:nth-child(5)').style.width = "160px";
	setTimeout(()=>{document.querySelector('.searchbox').style.display = "block";}, 300);
});



//Navigation Bar Appear & Remove Animation (Narrow Screen)

document.querySelector('.headerlink-narrow > li:nth-child(3) > a').addEventListener('click', function() {
	document.querySelector('.navi-wrapper').style.right = "0px";
	setTimeout(()=>{document.querySelector('.main-background').style.display = "block";}, 250);
});

document.querySelector('.navi-top > a.close-button').addEventListener('click', function() {
	document.querySelector('.main-background').style.display = "none";
	document.querySelector('.navi-wrapper').style.right = "-400px";
});


//Notice Bar Animation

setInterval(() => {
	document.querySelector('.notice-content > a:nth-child(2)').style.transition = "top 0.7s";
	document.querySelector('.notice-content > a:nth-child(2)').style.top = "-24px";
	setTimeout(()=>{
		document.querySelector('.notice-content').appendChild(document.querySelector('.notice-content > a:nth-child(1)'));
		document.querySelector('.notice-content > a:nth-child(1)').style.transition = "top 0s";
		document.querySelector('.notice-content > a:nth-child(1)').style.top = "0px";
	}, 1000);
}, 3000)


//Promotion Click Animation

document.querySelector('.promotion-plus').addEventListener('click', function() {
	document.querySelector('.promotion-block').style.height = "620px";
	document.querySelector('.promotion-plus').style.display = "none";
	document.querySelector('.promotion-close').style.display = "block";
});

document.querySelector('.promotion-close').addEventListener('click', function() {
	document.querySelector('.promotion-block').style.height = "0px";
	document.querySelector('.promotion-plus').style.display = "block";
	document.querySelector('.promotion-close').style.display = "none";
});


//Promotion Slide Animation

let currentSlideNum = 1;
let nextSlideNum = 2;
let prevSlideNum = 3;
let slideLength = 3;
let slideOn = true;
let slidePause = false;
let currentMoved = false;

function loadSlideNum() {
	nextSlideNum = currentSlideNum + 1 > slideLength ? (currentSlideNum + 1) % slideLength : (currentSlideNum + 1);
	prevSlideNum = currentSlideNum + 2 > slideLength ? (currentSlideNum + 2) % slideLength : (currentSlideNum + 2);
}

function nextSlide() {
	document.querySelector(`.promotion-content${currentSlideNum}`).style.zIndex = 1;
	document.querySelector(`.promotion-content${currentSlideNum}`).style.opacity = 0.5;
	document.querySelector(`.promotion-content${nextSlideNum}`).style.zIndex = 1;
	document.querySelector(`.promotion-content${nextSlideNum}`).style.opacity = 1;
	document.querySelector(`.promotion-content${prevSlideNum}`).style.zIndex = 0;
	document.querySelector(`.promotion-content${prevSlideNum}`).style.opacity = 0.5;
	document.querySelector(`.promotion-content${currentSlideNum}`).style.marginLeft = "-840px";
	document.querySelector(`.promotion-content${nextSlideNum}`).style.marginLeft = "0px";
	document.querySelector(`.promotion-content${prevSlideNum}`).style.marginLeft = "840px";
	document.querySelector(`.promotion-slide-onoff${currentSlideNum} > img`).setAttribute("src", "https://www.starbucks.co.kr/common/img/main/main_prom_off.png");
	document.querySelector(`.promotion-slide-onoff${nextSlideNum} > img`).setAttribute("src", "https://www.starbucks.co.kr/common/img/main/main_prom_on.png");
	currentSlideNum = currentSlideNum == slideLength ? 1 : (currentSlideNum + 1);
	loadSlideNum();
}

setInterval(() => {
	if (slideOn && !slidePause && !currentMoved) {
		nextSlide();
	}
}, 3000);

function startSlide() {
	document.querySelector('.promotion-slide-start').style.width = "0px";
	document.querySelector('.promotion-slide-stop').style.width = "13px";
	slidePause = false;
}

function stopSlide() {
	document.querySelector('.promotion-slide-stop').style.width = "0px";
	document.querySelector('.promotion-slide-start').style.width = "13px";
	slidePause = true;
}

function moveSlide(num) {
	currentMoved = true;
	while (currentSlideNum != num) {
		nextSlide();
	}
	setTimeout(()=>{currentMoved = false;}, 3000);
}


