var billboard = document.querySelector('.billboard');
var slogan = document.querySelector('.billboard__slogan');
var header = document.querySelector('.header');
var headerHeight = header.offsetHeight;

window.onscroll = function() {
	slogan.style.marginTop = pageYOffset/1.2 + "px";

	if (pageYOffset < 50) {
		header.style.height = headerHeight - pageYOffset + 'px';
	}

}