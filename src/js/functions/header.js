// Меню бургер
const menuBurger = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');
if (menuBurger) {
	menuBurger.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		menuBurger.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
}


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

			if (menuBurger.classList.contains('active')) {
				document.body.classList.remove('lock');
				menuBurger.classList.remove('active');
				menuBody.classList.remove('active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}


const header = document.getElementById('header');
const headerContainer = document.querySelector('.header__container');
const logo = document.querySelector('.logo__img');
const links = document.querySelectorAll('.menu__link');
const linksBtnForm = document.getElementById('button-form');



window.onscroll = function () {
	windowScroll();
};

function windowScroll() {
	header.classList.toggle('header--scroll', header.scrollTop > 100 || document.documentElement.scrollTop > 100);

	headerContainer.classList.toggle('fixed-active', headerContainer.scrollTop > 100 || document.documentElement.scrollTop > 100);

	logo.classList.toggle('logo__img--scroll', logo.scrollTop > 100 || document.documentElement.scrollTop > 100);

	links.forEach(itemLink => {

		itemLink.classList.toggle('menu__link--scroll', itemLink.scrollTop > 100 || document.documentElement.scrollTop > 100);

	})

	linksBtnForm.classList.toggle('btn--scroll', linksBtnForm.scrollTop > 100 || document.documentElement.scrollTop > 100);
}