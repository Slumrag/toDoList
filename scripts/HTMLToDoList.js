const list = new ToDOList(
	JSON.parse(localStorage.getItem('toDoList')) || [],
	JSON.parse(localStorage.getItem('seed')) || 0
);

window.addEventListener('load', (event) => {
	renderList(list);
});
//add item
function addToList(target = '', key = 0) {
	return (event) => {
		if (!target && !key) return;
		if (target && !event.target.closest(target)) return;
		if (key && event.keyCode !== key) return;
		console.log(event.target, event.keyCode);
		const inputText = document.querySelector('.to-do-list__input');
		if (!inputText.value) return;
		list.add(inputText.value, 'in progress');
		list.save();
		const listItem = createListItem(inputText.value);
		addListItem(list.seed, listItem);
		inputText.value = '';
	};
}
document.addEventListener('click', addToList('button[value=addItem]'));
document.querySelector('#list-input-text').addEventListener('keydown', addToList('', 13));
// delete list item
document.addEventListener('click', (event) => {
	if (!event.target.closest('button[value=delete]')) return;
	const key = +event.target.closest('li').getAttribute('data-key');
	list.remove(key);
	list.save();
	removeListItem(key);
	// renderList(list);
});
// // complete
document.addEventListener('click', (event) => {
	if (!event.target.closest('button[value=complete]')) return;
	const listItem = event.target.closest('li');
	const key = +listItem.getAttribute('data-key');
	listItem.classList.toggle('to-do-list__item_complete');
	const state = listItem.classList.contains('to-do-list__item_complete')
		? 'complete'
		: 'in progress';
	list.modifyItem(key, '', state);
	renderList(list);
	list.save();
});
function createListItem(text = '', state = 'in progress') {
	const listItem = document.createElement('li');
	listItem.setAttribute('class', 'to-do-list__item');
	listItem.innerHTML = `<div class="to-do-list__item-body"><button class="to-do-list__complete" type="button" value="complete" title="complete item"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13L10 16L17 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
<p class="to-do-list__text"></p>
<button class="to-do-list__delete" type="button" value="delete" title="remove item">
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button></div>
<div class="to-do-list__divider"></div>
`;
	listItem.querySelector('p').textContent = text;
	state === 'complete' && listItem.classList.add('to-do-list__item_complete');
	return listItem;
}
function addListItem(key, listItem) {
	const toDoItems = document.querySelector('#to-do-list');
	listItem.setAttribute('data-key', key);
	toDoItems.append(listItem);
}
function removeListItem(key) {
	const toDoItem = document.querySelector(`.to-do-list__item[data-key="${key}"]`);
	toDoItem?.remove();
}
function renderList(list) {
	if (!list.list) return;
	const toDoItems = document.querySelector('#to-do-list');
	toDoItems.innerHTML = '';
	const progressList = list.list.filter((el) => el.state === 'in progress');
	const completeList = list.list.filter((el) => el.state === 'complete');
	progressList.forEach((item) => {
		const listItem = createListItem(item.text, item.state);
		addListItem(item.key, listItem);
	});
	completeList.forEach((item) => {
		const listItem = createListItem(item.text, item.state);
		addListItem(item.key, listItem);
	});
}
