//toggle menu
document.addEventListener('click', (event) => {
	if (!event.target.closest('.controls__toggle')) return;
	const controlsMenu = document.querySelector('#controls-menu');
	controlsMenu.classList.toggle('controls__menu_hidden');
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.controls__button')) return;
	console.log(event.target.value);
});
