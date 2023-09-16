class ToDOList {
	constructor(list = [], seed = 0) {
		this._list = [...list];
		this._seed = seed;
	}
	get seed() {
		return this._seed;
	}
	get list() {
		return this._list;
	}
	add(text, state) {
		this._list.push({
			key: ++this._seed,
			text,
			state,
		});
	}
	remove(key) {
		const index = this._list.findIndex((el) => el.key === key);
		if (index > -1) return this._list.splice(index, 1);
	}
	shift() {
		return this._list.shift();
	}
	pop() {
		return this._list.pop();
	}
	get(start = 0, end = this._list.length) {
		return this._list.slice(start, end);
	}
	modifyItem(key, text, state) {
		const elem = this._list.find((el) => el.key === key);
		if (!elem) return;
		if (text) elem.text = text;
		if (state) elem.state = state;
	}
	save() {
		localStorage.setItem('toDoList', JSON.stringify(this._list));
		localStorage.setItem('seed', JSON.stringify(this._seed));
	}
}
