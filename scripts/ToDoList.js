class ToDOList {
	constructor(...params) {
		this._list = [...params];
	}
	get list() {
		return this._list;
	}
	add(id, text, state) {
		this._list.push({ id, text, state });
	}
	remove(index = 0) {
		return this._list.splice(index, 1);
	}
	get(start = 0, end = this._list.length) {
		return this._list.slice(start, end);
	}
	save() {
		localStorage.setItem('toDoList', JSON.stringify(this._list));
	}
}
