const billboard = document.querySelector('.billboard');
const slogan = document.querySelector('.billboard__slogan');
const header = document.querySelector('.header');
let headerHeight = header.offsetHeight;

window.onscroll = function() {
	slogan.style.marginTop = pageYOffset/1.2 + "px";
	if (pageYOffset < 50) {
		header.style.height = headerHeight - pageYOffset + 'px';
	}
}

const theMenuItems = document.querySelectorAll('.the-menu__item');
const theMenuBtn = document.querySelector('.the-menu__btn');
for (let i = 8; i < theMenuItems.length; i++) {
	theMenuItems[i].style.display = 'none';
	theMenuItems[i].style.opacity = 0;
}

theMenuBtn.onclick = () => {
	theMenuBtn.style.display = 'none';
	for (let i = 8; i < theMenuItems.length; i++) {
		setTimeout(() => {
			theMenuItems[i].style.display = 'flex';
		}, 100*(i-8));
		setTimeout(() => {
			theMenuItems[i].style.opacity = 1;
		}, 100*(i-7));
	}
}

const goldenStar = 'url(img/golden-star.png)';
const emptyStar = 'url(img/empty-star.png)';

function showStars(rating, stars) {
	for (let i = 0; i < stars.length; i++) {
		stars[i].style.backgroundImage = i <= rating ? goldenStar : emptyStar;
	}
}