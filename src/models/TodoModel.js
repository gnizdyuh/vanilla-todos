class TodoModel {
  init(todo) {
    return {
      ...todo,
      _isOpen: true,
      _createdAt: true
    };
  }

  complete(todo) {
    todo._isOpen = false;
    return todo;
  }

  reopen(todo) {
    todo._isOpen = true;
    return todo;
  }

  isOpen(todo) {
    return todo._isOpen;
  }
}

export default new TodoModel();
