//toggle menu
document.addEventListener('click', (event) => {
	if (!event.target.closest('.controls__toggle')) return;
	const controlsMenu = document.querySelector('#controls-menu');
	controlsMenu.classList.toggle('controls__menu_hidden');
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.controls__button')) return;
	const toDoList = [...document.querySelectorAll('.to-do-list__item')];
	if (!toDoList.length) return;
	switch (event.target.value) {
		case 'even':
			highlightEven(toDoList);
			break;
		case 'odd':
			highlightOdd(toDoList);
			break;
		case 'removeLast':
			let keyLast = +toDoList.pop().getAttribute('data-key');
			list.remove(keyLast);
			renderList(list);
			list.save();
			break;
		case 'removeFirst':
			let keyFirst = +toDoList.shift().getAttribute('data-key');
			list.remove(keyFirst);
			renderList(list);
			list.save();
			break;
	}
	// console.log(toDoList, event.target.value);
});
function isEven(num) {
	return num % 2 === 0;
}
function toggleHighlight(el) {
	el.classList.toggle('to-do-list__item_highlight');
}
function highlightOdd(list) {
	const oddElements = list.filter((_, idx) => !isEven(idx + 1));
	oddElements.forEach(toggleHighlight);
	setTimeout(() => oddElements.forEach(toggleHighlight), 1000);
}
function highlightEven(list) {
	const evenElements = list.filter((_, idx) => isEven(idx + 1));
	evenElements.forEach(toggleHighlight);
	setTimeout(() => evenElements.forEach(toggleHighlight), 1000);
}
