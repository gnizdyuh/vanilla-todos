import todosCollection from "../collections/todos";
import { getRenderableComponent } from "../lib/render";
import ToDoListViewDescriptor from "../views/ToDoList";

export default () => {
  const items = todosCollection.items;
  const todoListElement = getRenderableComponent(
    ToDoListViewDescriptor({ items })
  );
  return todoListElement;
};
