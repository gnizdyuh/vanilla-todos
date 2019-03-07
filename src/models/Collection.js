class Collection {
  constructor(name) {
    this._name = name;
    this._items = [];
  }
  _generateId() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }
  insert(item) {
    const _id = this._generateId();
    this._items.push({
      _id,
      ...item
    });
  }
  find(predicate) {
    return this._items.find(predicate);
  }
  get items() {
    return this._items;
  }
  remove(id) {
    this._items.filter(({ _id }) => _id !== id);
  }
  update(id, newItem) {
    this._items = this._items.map(item => {
      if (item._id === id) return { ...newItem, _id: id };
      return item;
    });
  }
}

export default Collection;
